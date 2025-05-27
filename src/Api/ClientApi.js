
class ProblemClientApi {
    #ApiEndpoint = ""
    constructor(url) {
        this.#ApiEndpoint = url
        this.headers = {
            "Content-Type": "application/json"
        }
    }

    async Post(url, value,obj={}) {
        try {
            console.log("ProblemUrl:- ",`${this.#ApiEndpoint}/${url}`);
            
           const response =  await fetch(`${this.#ApiEndpoint}/${url}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value??{}),
                ...obj
            })

            
                const JsonResponse = await response.json();
                return JsonResponse
        } catch (error) {
            return error
        }
    }
    async Get(url,headers) {
        try {
            const response = await fetch(`${this.#ApiEndpoint}/${url}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
            })

            const JsonResponse = await response.json();
            return JsonResponse
        } catch (error) {
            return error
        }
    }
}

class ExecutionClientApi {
    #ApiEndpoint = ""
    constructor(url) {
        this.#ApiEndpoint = url
        this.headers = {
            "Content-Type": "application/json"
        }
    }

    async Post(url, value,obj={}) {
        try {
            console.log("ProblemUrl:- ",`${this.#ApiEndpoint}/${url}`);
            
           const response =  await fetch(`${this.#ApiEndpoint}/${url}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value??{}),
                ...obj
            })

            
                const JsonResponse = await response.json();
                return JsonResponse
        } catch (error) {
            return error
        }
    }
    async Get(url,headers) {
        try {
            const response = await fetch(`${this.#ApiEndpoint}/${url}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
            })

            const JsonResponse = await response.json();
            return JsonResponse
        } catch (error) {
            return error
        }
    }
}

class AuthenticationClientApi {
    #ApiEndpoint = ""
    constructor(url) {
        this.#ApiEndpoint = url
        this.headers = {
            "Content-Type": "application/json"
        }
    }

    async Post(url, value,obj={}) {
        try {
            console.log("ProblemUrl:- ",`${this.#ApiEndpoint}/${url}`);
            
           const response =  await fetch(`${this.#ApiEndpoint}/${url}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value??{}),
                ...obj
            })

            
                const JsonResponse = await response.json();
                return JsonResponse
        } catch (error) {
            return error
        }
    }
    async Get(url,headers) {
        try {
            const response = await fetch(`${this.#ApiEndpoint}/${url}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
            })

            const JsonResponse = await response.json();
            
            return JsonResponse
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const ExecutionEndpoint = new ExecutionClientApi("http://localhost:8000/execute-code");

export const ProblemEndpoint = new ProblemClientApi("http://localhost:8000/problem");

export const AuthenticationEndpoint = new AuthenticationClientApi("http://localhost:8000/user");
