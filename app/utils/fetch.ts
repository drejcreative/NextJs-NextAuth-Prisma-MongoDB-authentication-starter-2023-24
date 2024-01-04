export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const makeRequest = async (url: string, method: Method, data?: any) => {
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method !== Method.GET && data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody);
    }

    // For methods that do not have a response body, return a success message
    if (method === Method.DELETE || method === Method.PUT) {
      return { message: 'Success' };
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};
