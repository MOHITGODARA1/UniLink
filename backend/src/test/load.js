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

const BASE_URL = "https://unilink-production-a1c4.up.railway.app";

export default function () {
  const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  group("Signup API Test", () => {
    const LOGIN_PAYLOAD = JSON.stringify({
        Name: "user_12345",        
        Password: "SecurePass123!"
      });

    const res = http.post(
      `${BASE_URL}/api/user/v1/Login`,
      LOGIN_PAYLOAD,
      {
        headers: { "Content-Type": "application/json" },
        timeout: "5s",
      }
    );

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