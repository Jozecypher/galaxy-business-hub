document.addEventListener("DOMContentLoaded", ()=>{
    function simulateLoading () {
    let services = document.getElementById("serviceList");
    console.log("Galaxy Business Hub - connecting to server"); //This will be printed first
    setTimeout(() => {
        console.log("Services fetched successfully"); //This will be printed third
    }, 2000);

    setTimeout(() => {
        console.log("Recommendations loaded");  //This will be printed fourth
    }, 3000);

    console.log("Interface ready"); //This will be printed second
}

simulateLoading();

 

    function getClient(clientId, callback) {
        console.log(`fetching client ${clientId} from Database`);
        setTimeout(() =>{
            if(clientId === 1){
                callback(null, {id: 1, name: "Joseph", business: "Galaxy Business Hub"});
            }else{
                callback("client not found", null);
            }
            
        }, 1000);
    }

    function getClientServices(clientId, callback){
        console.log("fetching client services from Database");
        setTimeout(() => {
            callback(null, [{name: "Web Design", price: 500}, {name: "SEO", price:300}]);
        }, 800);
    }

    function getInvoice(clientId, callback){
        setTimeout(() => {
            callback(null, {id: clientId, total: 800, status: "pending"})
        }, 500);

        
    }

    function generateInvoice(ClintName, Services, callback){
        console.log("Invoice generating");
        setTimeout(() => {
            
            const clientName = ClintName;
            const services = Services || [];

            const totalPrice = services.reduce((sum, service) => sum + (service.price || 0), 0);

            const invoice = {
                client: clientName,
                total: totalPrice,
                services: services,
                status: "pending"
            };

            callback(null, invoice);  

        }, 600);

       
    }

    
                    
    function loadDashboard(userId, callback){
        getUser(userId, function(err, user){
            if (err) return callback(err, null);

            getStats(user.id, function(err, stats){
                if (err) return callback(err, null);

                callback(null, {
                    user: user,
                    stats: stats
                });
            });
        });
    }


    function handleInvoice(err, invoice, clientName){
        if (err) return console.log(err);
        console.log(`Invoice for ${clientName}: $${invoice.total}`);
    }

    function handleClient(err, client){
        if(err) return console.log(err);
        getInvoice(client.id, function(err, invoice){
            handleInvoice(err, invoice, client.name);
        });
    }

    function handleOrder(err, order){
        if (err) return console.log(err);
        getClient(order.clientId, handleClient);
    }

    getOrder("ORD001", handleOrder);

    function getOrder(orderId, callback){
        console.log(`fetching order ${orderId} from Database`);
        setTimeout(() => {
            callback(null, {id: orderId, clientId: 1});
        }, 700);
    }


    function getClientPromise(clientId){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(clientId === 1){
                    resolve({id: 1, name: "Joseph", Business: "Galaxy Business Hub"});
                }else{
                    reject("Client not found");
                }
            }, 1000 );
        });
    }

    function getClientServicesPromise(services){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{name: "web Design", price: 500}, {name: "SEO", price: 300}]);
            }, 800);
        });
    }

    function generateInvoicePromise(clientName, services){
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                let totalPrice = services.reduce((sum, service) => sum + (service.price || 0), 0);
                let invoice = {
                    client: clientName,
                    total: totalPrice,
                    services: services,
                    status: "pending"
                };

                resolve(invoice);
            }, 600);
        });
    }

    function getAnnouncements(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {id: 1, title: "System Maintenance", content: "We will be performing system maintenance on Saturday."}
                ]);
            }, 500);
        });
    }

    function loadClientDashboard(clientId){
        let activeClientName = "";
        getClientPromise(clientId)
           .then(client => {
            activeClientName = client.name;
            console.log("client loaded:", client.name);
            return getClientServicesPromise(client.id);
        })
        .then(services => {
            console.log("Services loaded successfully:", services.length);
            return generateInvoicePromise(activeClientName, services);
        })
        .then(invoice => {
            console.log("Dashboard loaded successfully:", invoice);
            console.log(`client: ${invoice.client}`);
            console.log(`Total: $${invoice.total}`);
            console.log(` ${invoice.client}'s invoice for ${invoice.services.length} services for $${invoice.total} - ${invoice.status}`);
        })
        .catch(error => {
            console.log("Dashboard loading failure:", error);
        })
        .finally(() => {
            console.log("Dashboard processing complete.");
        });

        
    }
    loadClientDashboard(1);

    function loadDashboard(){
        let getAnnouncementsPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    "New pricing available", "Office closed on Sunday"
                ]);
            }, 500);
        });

    
    
    
    Promise.all([ 
        new Promise((resolve, reject) => {
          getClient(1 ,(err,res) => err ? reject(err) : resolve(res));
        }),
        new Promise((resolve, reject) =>{
          getClientServices(1, (err, res) => err ? reject(err) : resolve(res));
        }),
        getAnnouncementsPromise
    ])
    .then(([client, services, announcements]) => {
        console.log(`Client: ${client.name}`);
        console.log(`Services: ${services.length}`);
        console.log(`Announcements: ${announcements.length}`);
        console.log("Dashboard loaded in parallel");
    })
    .catch((err) => {
        console.log(err);
    });
  }

loadDashboard();

 async function loadGalaxyDashboard(clientId){
    console.log("Loading Galaxy dashboard....");
    try{
        let client = await getClientPromise(clientId);
        console.log(`Welcome aboard, ${client.name}!`);

        let [services, announcements] = await Promise.all([
            getClientServicesPromise(client.id || clientId),
            getAnnouncements()
        ]);

        console.log(`${services.length} services available.`);
        console.log(`${announcements.length} announcements available.`);

        let invoice = await generateInvoicePromise(client.name, services);
        console.log("....Dashboard Ready.....")
        console.log(`${invoice.client}'s invoice for ${invoice.services.length} services for $${invoice.total} - ${invoice.status}`);

        return invoice;

    }catch (error){
        console.error("Dashboard failure:", error);
        throw error;
    }finally{
        console.log("Dashboard processing complete");
    }

    
 }

 loadGalaxyDashboard(1)
 .then(invoice => {
     console.log("Invoice generation successful:", invoice.total);
 })
 .catch(error => {
     console.log("Invoice generation failure:", error);
 });

 async function loadAllClientData(clientId){
    console.time("load");
    console.log("Loading all client data....");
    try{
        let client = await getClientPromise(clientId);
        console.log(`Welcome aboard, ${client.name}!`);

        let services;
        try{
            services = await getClientServicesPromise(client.id || clientId);
            console.log(`${services.length} services available.`);
        }catch (error){
            console.log("Services unavailable:", error);
            services = [];
        }

        let invoice = await generateInvoicePromise(client.name, services);
        console.log("Invoice generated successfully:", invoice);
        console.timeEnd("load");
        return invoice;
    }catch (error){
        console.error("Client unavailable:", error);
        console.timeEnd("load");
        throw error;
    }
 }

 loadAllClientData(1)
 .then(invoice => console.log("Invoice generation successful:", invoice))
 .catch(error => console.log("Invoice generation failure:", error));



 let API = "https://jsonplaceholder.typicode.com";

async function fetchGalaxyClients(){
    try{
        console.log(".....Fetching Galaxy Clients....... ");
        let response = await fetch(`${API}/users`);

        if(!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        let users = await response.json();
        console.log(`Total number of users: ${users.length}`);

        users.forEach(user => {
            console.log(`Name: ${user.name}, Email: ${user.email}, Company: ${user.company.name}`);
        });

        return users;
    } catch(error){
        console.log("Error fetching client:", error.message);
        throw error;
    }
}

fetchGalaxyClients()
.then(users => console.log("Total number of user", users.length))
.catch(error => console.log("Error fetching client", error.message));

let URL_BASE = "https://jsonplaceholder.typicode.com";

async function safeFetch(url, options = {}) {
    try{
        console.log(".....Fetching Galaxy Data...");

        let response = await fetch (url, options);

        if(!response.ok){
            throw new Error("http error");
        }

        let data = await response.json();
        return data;
    } catch (error) {
       return {
        error: error.message};
    };
}

async function runRequests(){
    let post1 = await safeFetch(`${URL_BASE}/posts/1`);
    let post999 = await safeFetch(`${URL_BASE}/posts/999`);

    let newBooking = await safeFetch(`${URL_BASE}/posts`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            title: "Galaxy Business Hub",
            body: "Web designing Requested",
            userId: 1
        })
    });

    console.log("Get post 1", post1);
    console.log("Get post 999", post999);
    console.log("Post new booking", newBooking);
}

runRequests();

async function robustFetch(url, options = {}) {
    const controller = new AbortController();
    const {signal} = controller;
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 5000);

    try{
        let response = await fetch(url, {...options, signal});
        if(!response.ok){
            if(response.status === 404){
                throw new Error("Resource not found");
            }
            if(response.status === 401){
                throw new Error("Unauthorized Access");
            }
            if(response.status === 500){
                throw new Error("Server error");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error){
        if(error.name === `AbortError`){
            throw new Error("Request timeout");
        }
        if(error instanceof TypeError){
            throw new Error("Network connection failed");
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

// Debugging 


//Bug 1: Using attempt < maxRetries will cause an off by one bug prompting the loop to run only two
//retries 1 and 2 yet the default is 3 hence exiting the loop before the third iteration.

//Bug 2: Unnecessary Delay after the final attempt

async function loadWithRetry (url, maxRetries = 3){
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++){
        try{
            let response = await fetch(url);
            if(!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed`);
            if (attempt < maxRetries) {
                let delay = attempt*1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError;
}

const FALLBACKS ={
     user:{id: 1, name: "Anonymous User"},
     posts: [],
     todo: {id: 1, title: "No tasks", completed: false}
    };

async function loadDashboardSafely(){
    const urls = [
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts?_limit=3",
        "https://jsonplaceholder.typicode.com/todos/1"
    ];

    try {
        const results = await Promise.allSettled(urls.map(url => robustFetch(url)));

        const userData = results[0].status === "fulfilled" ? results[0].value
        : (console.error("User fetch failed:", results[0].reason), FALLBACKS.user);

        const postsData = results[1].status === "fulfilled" ? results[1].value
        : (console.error("Posts fetch failed:", results[1].reason), FALLBACKS.posts);

        const todoData = results[2].status === "fulfilled"? results[2].value
        : (console.error("Todo fetch failed:", results[2].reason), FALLBACKS.todo);


        console.log("....Dashboard Summary");
        console.log("User Data:", userData);
        console.log("Posts Data:", postsData);
        console.log("Current Todo:", todoData);
        console.log("-----------------------");


    } catch (criticalError) {
        console.error("Critical Dashboard Failure:", criticalError);
    }

    window.addEventListener("unhandledrejection", (event) => {
        console.warn("Caught unhandled promise rejection:", event.reason );

        event.preventDefault();
    });

}

loadDashboardSafely();

// Debugging 2

//Bug 1: Misplaced try....Catch block, The try...catch block wraps the response.json(), but the actual network request is
//outside so if Abortsignal.timeout triggers,the fetch will reject and throw an error, bypassing the catch block entirely 
//and causing an unhandled promise rejection.

//Bug 2: Wrong Error target: response.json() parses successfully downloaded body data not handling network or timeout
//issues.

//Corrected Code

async function fetchUserProfile(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            signal: AbortSignal.timeout(4000),
        });

        if (!response.ok) {
            throw new Error(`failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === "TimeoutError") {
            console.error("Request timed out");
            return null;
        }

        throw error;
    }
}

fetchUserProfile(1);

//Debugging 3

//Bug 1: The Body is not stringified, Object passed instead of JSON string yet the body requires JSON.stringify when using 
//"application.json" passing in raw JS form will send a literal object to the server.

//Bug 2: Capitalization error, JS uses a capitalized "Error" when calling errors otherwise it will throw a reference error
//"error not defined".

//Bug 3: Since async.....await doesn't handle error as in synchronous functions, adding a try.....catch will mitigate
//HTTP and network errors.

//Debugged Answer:

async function addProduct(name,price) {
    try{
        const response = await fetch("https://galaxyhub.com", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({name,price})
        });

        if(!response.ok){
            throw new Error('Failed with status: ${response.status}');
        }

        return await response.json();
    } catch (error) {
        console.error ("Failed to add product:", error.message);
        throw error;
    } 
    
    
}

async function fetchWithRetryTimeout(url, maxRetries = 4) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try{
            const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
            if(!response.ok){
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        }catch (error){
            lastError = error;
            console.log(`Attempt $({attempt}) failed: ${error.status || error.message}`);
            if(attempt < maxRetries){
                let delay = attempt * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

    }
    throw lastError;
}

//End of Phase 3 Debugging Questions

//Q5

//Bug: The Declared response variable missed the key word "await" before the fetch call.
//Since fetch is asynchronous it returns a promise instead of the actual object so
//1. response becomes a promise,
//2. response.ok becomes undefined,
//3. and !response.ok becomes true, then the function throws an error even when network request is successful.
//It's better to add a try/catch block on async functions to mitigate network issues.

//Debugged Function:

async function getOrderSummary (orderId) {
    try{
     let response = await fetch (`https://galaxyhub.com ${orderId}`);

     if(!response.ok){
        throw new Error(`Order not Found: (status ${response.status})`);
     }

     return await response.json();
    }catch (error){
        console.error("Failed to fetch order summary:", error.message);

        throw error;
    }


}

//Q6:
//Bug: wording error: async uses Capitalized word when throwing an error and then 
//the body is not stringified and lastly there's a missing try/catch block.

//Debugged Function:

async function updateProduct (id, updates) {
    try {
        let response = await fetch (`https://api.galaxyhub.com/orders/${id}, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, updates})
            }`);

        if(!response.ok){
            throw new Error(`Update failed: ${response.status}`);
            
        }
        return await response.json();
    }catch(error){
        console.error("Failed to update product:", error.message);

        throw error;
    }
}

//Q7:
//Bug: 1. The try/catch block is missing
//Bug: 2. It uses a promise.all() in which case of a single failure the entire promise.all() will fail 
//and throw an unhandled promise rejection.
//Bug: 3. The fetch() returns a response object which needs to be parsed using response.json() to get the actual data.

//Debugged Function:

async function loadReports() {
    try {
        const results = await Promise.allSettled([
            fetch("https://api.galaxyhub.com/reports/sales").then(response => response.ok ? response.json() :null),
            fetch("https://api.galaxyhub.com/reports/stock").then(response => response.ok ? response.json() :null),
            fetch("https://api.galaxyhub.com/reports/orders").then(response => response.ok ? response.json() :null)
        ]); 
        

        return {
            sales: results[0].status === "fulfilled" ? results[0].value : null,
            stock: results[1].status === "fulfilled" ? results[1].value : null,
            orders: results[2].status === "fulfilled" ? results[2].value : null
        };
          
        
    } catch (error) {
        console.error("Error loading reports:", error.message);
        throw error;
     }
    }

}); 
