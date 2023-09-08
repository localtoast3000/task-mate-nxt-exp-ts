export default function BasicHttpRequests(origin: string) {
  return {
    constructURL(endpoint: string) {
      return `${origin}${endpoint}`;
    },

    async get(endpoint: string, headers = {}) {
      const result = await fetch(this.constructURL(endpoint), {
        method: 'GET',
        headers: {
          ...headers,
        },
      });
      return result;
    },

    async post(endpoint: string, data: any, headers = {}) {
      const result = await fetch(this.constructURL(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return result;
    },

    async delete(endpoint: string, data: any, headers = {}) {
      const result = await fetch(this.constructURL(endpoint), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data && JSON.stringify(data),
      });
      return result;
    },

    async put(endpoint: string, data: any, headers = {}) {
      const result = await fetch(this.constructURL(endpoint), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data && JSON.stringify(data),
      });
      return result;
    },
  };
}
