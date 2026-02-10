const backendBaseUrl = process.env.API_BASE_URL || "http://localhost:4000";

const buildTargetUrl = (pathSegments, searchParams) => {
  const normalizedPath = pathSegments.join("/");
  const search = searchParams.toString();
  const searchSuffix = search ? `?${search}` : "";
  return `${backendBaseUrl}/api/${normalizedPath}${searchSuffix}`;
};

const createProxyResponse = async (request, context) => {
  const { path = [] } = await context.params;
  const targetUrl = buildTargetUrl(path, request.nextUrl.searchParams);
  const method = request.method.toUpperCase();

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  const init = {
    method,
    headers
  };

  if (method !== "GET" && method !== "HEAD") {
    init.body = await request.text();
  }

  const response = await fetch(targetUrl, init);
  const payload = await response.text();

  return new Response(payload, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json"
    }
  });
};

export async function GET(request, context) {
  return createProxyResponse(request, context);
}

export async function POST(request, context) {
  return createProxyResponse(request, context);
}

export async function PUT(request, context) {
  return createProxyResponse(request, context);
}

export async function DELETE(request, context) {
  return createProxyResponse(request, context);
}

export async function PATCH(request, context) {
  return createProxyResponse(request, context);
}
