
const backendEndpoint = import.meta.env.VITE_NODE_ENV !=="production"?
import.meta.env.VITE_BACKEND_API_DEVELOPMENT:import.meta.env.VITE_BACKEND_API_PRODUCTION;
console.log(backendEndpoint);



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


class SubmissionClientApi {
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

export const SubmissionEndpoint = new SubmissionClientApi(`${backendEndpoint}/submission`);

export const ExecutionEndpoint = new ExecutionClientApi(`${backendEndpoint}/execute-code`);

export const ProblemEndpoint = new ProblemClientApi(`${backendEndpoint}/problem`);

export const AuthenticationEndpoint = new AuthenticationClientApi(`${backendEndpoint}/user`);
