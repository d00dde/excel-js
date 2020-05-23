import {capitalize} from "@core/utils";

export class DOMListener {
	constructor($root, listeners = []) {
		if(!$root) {
			throw new Error('No $root parameter in DOMListener')
		}
		this.$root = $root; 
		this.listeners = listeners;
	}
	initDOMListeners() {
		this.listeners.forEach((listener) => {

			const listenerName = createListenerName(listener);
			if(!this[listenerName]){
				throw new Error (`Method ${listenerName} not implemented in ${this.name} Component`);
			}
			this.$root.on(listener, this[listenerName].bind(this));
		})
	}
}

function createListenerName(eventName) {
		return 'on' + capitalize(eventName);
	}