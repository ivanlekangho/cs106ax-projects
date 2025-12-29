/**
 * File: flutterer.js
 * ------------------
 * Contains the logic that makes Flutterer work, as well as all initialization.
 */
"use strict";

// Specify a list of valid users. (Extension opportunity: You can create an
// API route that lets users sign up, and then here, you can load a list of
// registered users.)
const USERS = [
    "Ivan Ho",
    "Ben Yan",
    "Andy Wang",
    "Diego Padilla",
    "Eugene Francisco",
    "Jenny Wei",
    "Sabrina Yen-Ko",
    "Tina Zheng",
    "Doris Beyonce James-Cain",
    "Jerry Cain",
];



/**
 * Function: Flutterer
 * -------------------
 * Flutterer's entry point
 */
function Flutterer() {
    let floots = []; // list of all floots loaded from server
    let selectedUser = USERS[0]; 
    let modalShown = false;
    loadFloots(); // initial page load

    /**
     * Rebuilds the whole page. If `selectedFloot` is given, shows its modal.
     */
    function render(selectedFloot = null) {
        while (document.body.lastChild != null) {
            document.body.removeChild(document.body.lastChild)
        }
        document.body.appendChild(MainComponent(selectedUser, floots, actions, selectedFloot));
        if (selectedFloot !== null) {
            modalShown = true;
        } else {
            modalShown = false;
        }
    }

    /**
     * Loads floots from the server, updates state, and re-renders.
     * Keeps the modal open if `selectedFloot` is passed in.
     */
    function loadFloots(selectedFloot = null) {
        let req = AsyncRequest("/api/floots");
        req.setMethod("GET");
        req.setSuccessHandler(getSuccessHandler);
        req.send();

        function getSuccessHandler(response) {
            floots = JSON.parse(response.getPayload());
            render(selectedFloot);
        };
    }

    /**
     * Finds and returns the floot in the given list whose id matches `id`.
     * Used after reloading floots so the modal can reopen on the updated one.
     */
    function findUpdatedFloot(floots, id) {
        for (let i = 0; i < floots.length; i++) {
            if (floots[i].id === id) {
                return floots[i];
            } 
        }
        return null;
    }

    /**
     * Collection of functions the UI can call to change state or talk to the server.
     */
    let actions = {
        changeSelectedUser: function(username) {
            switchUser(username);
        },

        // POST new floot, then reload feed
        createFloot: function(message, username) {
            let req = AsyncRequest("/api/floots");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({ username: username, message: message }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                loadFloots();
            }
        },

        // POST delete floot, then reload feed
        deleteFloot: function(flootInfo, selectedUserParam) {
            let req = AsyncRequest("/api/floots/" + flootInfo.id + "/delete");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({ username: selectedUserParam }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                loadFloots();
            }
        },

        // Opens modal for a specific floot
        openFlootInModal: function(flootObject) {
            render(flootObject);
        },

        // Closes modal
        closeModal: function() {
            render();
        },

        // POST new comment, then reload floots and reopen modal for updated floot
        createComment: function(message, floot) {
            let req = AsyncRequest("/api/floots/" + floot.id + "/comments");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({ username: selectedUser, message: message }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                // Reload floots so we can find the updated floot with new comment
                let req = AsyncRequest("/api/floots");
                req.setMethod("GET");
                req.setSuccessHandler(getSuccessHandler);
                req.send();

                function getSuccessHandler(response) {
                    floots = JSON.parse(response.getPayload());

                    // find updated floot
                    let updatedFloot = findUpdatedFloot(floots, floot.id);
                    render(updatedFloot);
                };
            }
        },

        // POST delete comment, reload floots, and reopen modal for the same floot
        deleteComment: function(id, flootId) {
            let req = AsyncRequest("/api/floots/" + flootId + "/comments/" + id + "/delete");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({ username: selectedUser }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                // reload so modal gets updated floot object
                let req = AsyncRequest("/api/floots");
                req.setMethod("GET");
                req.setSuccessHandler(getSuccessHandler);
                req.send();

                function getSuccessHandler(response) {
                    floots = JSON.parse(response.getPayload());
                    // find updated floot
                    let updatedFloot = findUpdatedFloot(floots, flootId);
                    render(updatedFloot);
                };
            }
        },

        //EXTENSION
        likeFloot: function(flootInfo) {
            let req = AsyncRequest("/api/floots/" + flootInfo.id + "/like");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({
                username: selectedUser
            }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                // re-get all floots so modal shows updated data
                let req = AsyncRequest("/api/floots");
                req.setMethod("GET");
                req.setSuccessHandler(getSuccessHandler);
                req.send();

                function getSuccessHandler(response) {
                    let payload = response.getPayload();
                    floots = JSON.parse(payload);

                    if (modalShown) {
                        // find updated floot
                        let updatedFloot = findUpdatedFloot(floots, flootInfo.id);
                        render(updatedFloot);
                    } else {
                        render();
                    }                    
                };
            }
        },

        // EXTENSION
        unlikeFloot: function(flootInfo) {
            let req = AsyncRequest("/api/floots/" + flootInfo.id + "/unlike");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({
                username: selectedUser
            }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                // re-get all floots so modal shows updated data
                let req = AsyncRequest("/api/floots");
                req.setMethod("GET");
                req.setSuccessHandler(getSuccessHandler);
                req.send();

                function getSuccessHandler(response) {
                    let payload = response.getPayload();
                    floots = JSON.parse(payload);

                    if (modalShown) {
                        // find updated floot
                        let updatedFloot = findUpdatedFloot(floots, flootInfo.id);
                        render(updatedFloot);
                    } else {
                        render();
                    }
                }
            }
        },

        //EXTENSION
        likeComment: function(flootID, comment) {
            let req = AsyncRequest("/api/floots/" + flootID + "/comments/" + comment.id + "/like");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({ 
                username: selectedUser 
            }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                let req = AsyncRequest("/api/floots");
                req.setMethod("GET");
                req.setSuccessHandler(getSuccessHandler);
                req.send();

                function getSuccessHandler(response) {
                    let payload = response.getPayload();
                    floots = JSON.parse(payload);
                    // find updated floot
                    let updatedFloot = findUpdatedFloot(floots, flootID);
                    render(updatedFloot);
                }
            }
        },

        //EXTENSION
        unlikeComment: function(flootID, comment) {
            let req = AsyncRequest("/api/floots/" + flootID + "/comments/" + comment.id + "/unlike");
            req.setMethod("POST");
            req.setPayload(JSON.stringify({ 
                username: selectedUser 
            }));
            req.setSuccessHandler(postSuccessHandler);
            req.send();

            function postSuccessHandler() {
                let req = AsyncRequest("/api/floots");
                req.setMethod("GET");
                req.setSuccessHandler(getSuccessHandler);
                req.send();

                function getSuccessHandler(response) {
                    let payload = response.getPayload();
                    floots = JSON.parse(payload);
                    // find updated floot
                    let updatedFloot = findUpdatedFloot(floots, flootID);
                    render(updatedFloot);
                }
            }
        },



    };
    
    /**
     * Switches the logged-in user and re-renders.
     */
    function switchUser(newUser) {
        selectedUser = newUser;
        render();
    }
}


/**
 * Component: MainComponent
 * ------------------------
 * Constructs all the elements that make up the page.
 *
 * Parameters:
 *   * selectedUser: username of the logged-in user (string)
 *   * floots: an array of floot aggregates/objects that make up the news feed
 *   * actions: an aggregate containing a variety of functions that can be used
 *     to change the page or send data to the server (e.g. change the currently
 *     logged-in user, delete floots, etc.)
 *   * TODO: In Milestone 7: a parameter that contains the floot object that
 *     should be displayed in a modal, or null if no floot has been clicked and
 *     the modal should not be displayed
 *
 * Returns a node with the following structure:
 *   <div class="primary-container">
 *       <Sidebar />
 *       <NewsFeed />
 *   </div>
 */
function MainComponent(selectedUser, floots, actions, selectedFloot = null) {

    // TODO: Implement this component in Milestone 2
    let div = document.createElement("div");
    div.classList.add("primary-container");
    div.appendChild(Sidebar(USERS, selectedUser, actions));
    div.appendChild(NewsFeed(selectedUser, floots, actions));

    // if a floot was clicked, show the modal for that floot
    if (selectedFloot) {
        div.appendChild(FlootModal(selectedFloot, selectedUser, actions));
    }
    
    return div
}


/**
 * NOTE TO STUDENTS: you don't need to understand anything below.  It's fancy
 * JavaScript we need to help make the development process a little easier.
 *
 * The following code uses some Javascript magic so that all network requests
 * are logged to the browser console. You can still view all network requests
 * in the Network tab of the browser console, and that may be more helpful (it
 * provides much more useful information), but students may find this handy for
 * doing quick debugging.
 */
(() => {
    function log_info(msg, ...extraArgs) {
        console.info("%c" + msg, "color: #8621eb", ...extraArgs);
    }
    function log_success(msg, ...extraArgs) {
        console.info("%c" + msg, "color: #39b80b", ...extraArgs);
    }
    function log_error(msg, ...extraArgs) {
        console.warn("%c" + msg, "color: #c73518", ...extraArgs);
    }
    const _fetch = window.fetch;
    window.fetch = function(...args) {
        log_info(`Making async request to ${args[1].method} ${args[0]}...`);
        return new Promise((resolve, reject) => {
            _fetch(...args).then((result) => {
                const our_result = result.clone();
                our_result.text().then((out_text) => {
                    if (our_result.ok) {
                        log_success(`Server returned successful response for ${our_result.url}`);
                    } else {
                        log_error(`Server returned Error ${our_result.status} `
                            + `(${our_result.statusText}) for ${our_result.url}`,
                            out_text);
                    }
                    resolve(result);
                });
            }, (error) => {
                log_error('Error!', error);
                reject(error);
            });
        });
    };

    log_info("Did you know?", "For this assignment, we have added some code that "
        + "logs network requests in the JS console. However, the Network tab "
        + "has even more useful information. If you are having problems with API "
        + "calls, the Network tab may be a good place to check out; you can see "
        + "POST request bodies, full server responses, and anything else you might "
        + "desire there.");
})();

document.addEventListener("DOMContentLoaded", Flutterer);
