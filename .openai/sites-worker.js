const normalizeHtmlRequest = (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    url.pathname = "/index.html";
  }
  return new Request(url, request);
};

export default {
  async fetch(request, env) {
    if (!env?.ASSETS) {
      return new Response("Static asset binding is unavailable.", { status: 503 });
    }

    const normalized = normalizeHtmlRequest(request);
    let response = await env.ASSETS.fetch(normalized);

    if (
      response.status === 404 &&
      request.method === "GET" &&
      !new URL(request.url).pathname.split("/").pop()?.includes(".")
    ) {
      const fallbackUrl = new URL("/index.html", request.url);
      response = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    }

    return response;
  },
};
