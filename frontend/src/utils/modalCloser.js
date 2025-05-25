/* global bootstrap */

// ^^ The above line has to be added because the base capstone structure imports bootstrap via CDN instead of NPM
// This helper function closes any bootstrap modal with the provided id value, eg "loginModal"

export function modalCloser(elementId) {
    const modalElement = document.getElementById(elementId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
};