import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 },   // ramp up
    { duration: "20s", target: 50 },   // normal load
    { duration: "30s", target: 100 },  // peak load
    { duration: "10s", target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: [
      "avg<300",     // average response time
      "p(95)<600",   // 95% requests under 600ms
      "p(99)<900",   // 99% under 900ms
    ],
    http_req_failed: ["rate<0.01"], // <1% errors
  },
};

const BASE_URL = "http://localhost:5002";

export default function () {
  // unique user data (avoid duplicate conflicts)
  const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  group("Signup API Test", () => {
    const payload = JSON.stringify({
      UserName: `user_${uniqueId}`,
      Email: `user_${uniqueId}@gmail.com`,
      College: "LPU",
      Password: "SecurePass123!",
    });

    const res = http.post(
      `${BASE_URL}/api/user/v1/user-Register`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: "5s",
      }
    );

    // optimized checks (no repeated JSON.parse)
    check(res, {
      "status is 201 or 409": (r) => r.status === 201 || r.status === 409,
      "no server error (not 500)": (r) => r.status !== 500,

      "response success true": (r) => {
        const body = r.json();
        return body && body.success === true;
      },

      "userId exists": (r) => {
        const body = r.json();
        return body?.data?.userId !== undefined;
      },

      "response time < 500ms": (r) => r.timings.duration < 500,
    });

    sleep(0.1);
  });

  // lightweight endpoint (important for realistic testing)
  group("Health Check API", () => {
    const res = http.get(`${BASE_URL}/health`);

    check(res, {
      "health status 200": (r) => r.status === 200,
      "health response ok": (r) => {
        const body = r.json();
        return body?.status === "ok";
      },
      "health fast (<200ms)": (r) => r.timings.duration < 200,
    });

    sleep(0.05);
  });
}