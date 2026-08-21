const control_ids = Object.freeze({
    CONNECT_BUTTON: 'connectButton',
    DISCONNECT_BUTTON: 'disconnectButton',
    CLEAR_BUTTON: 'clearButton',
    MESSAGES_CONTAINER: 'messages',
});


function get_element(id) {
    const element = document.getElementById(id);
    if(!element) {
        throw new Error(`Element with id ${id} not found`);
    }
    return element;
}

function bind_click(button, callback) {
    button.addEventListener('click', callback);
}

function bind_message(message, callback) {
    message.addEventListener('message', callback);
}

/**
 * @typedef {Object} UIEventHandlers
 * @property {Function} connect - The connect event.
 * @property {Function} disconnect - The disconnect event.
 * @property {Function} clear - The clear button click event.
 */

/**
 * Links the UI elements to the control_ids.
 * @param {UIEventHandlers} uIEventHandlers - The UI event handlers.
 * @returns {void}
 */
function link_ui_buttons(uIEventHandlers) {
    bind_click(get_element(control_ids.CONNECT_BUTTON), uIEventHandlers.connect);
    bind_click(get_element(control_ids.DISCONNECT_BUTTON), uIEventHandlers.disconnect);
    bind_click(get_element(control_ids.CLEAR_BUTTON), uIEventHandlers.clear);
}

function write_to_messages(message) {
    const messages_container = get_element(control_ids.MESSAGES_CONTAINER);
    messages_container.innerHTML += message + '<br>';
    messages_container.scrollTop = messages_container.scrollHeight;
}

function clear_messages() {
    const messages_container = get_element(control_ids.MESSAGES_CONTAINER);
    messages_container.innerHTML = '';
}

function close_connection() {
    const messages_container = get_element(control_ids.MESSAGES_CONTAINER);
    messages_container.innerHTML = '';
}

export { link_ui_buttons, write_to_messages, clear_messages, close_connection };