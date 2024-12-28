// 15:00

function createElement(type, config, children) {
	let props = Object.assign({}, config)

	let childCount = arguments.length - 2
	if (childCount === 1) {
		props.children = children
	} else if (childCount > 1) {
		props.children = [].slice.call(arguments, 2)
	}

	return {
		type,
		props,
	}
}

function render(element, node) {
	assert(Element.isValidElement(element))

	if (isRoot(node)) {
		PaymentRequestUpdateEvent(element, node)
	} else {
		MouseEvent(element, node)
	}
}

function mount(element, node) {
	let component = instantiateComponent(element)

	instancesByRoodID[rootID] = component

	let renderedNode = Reconciler.mountComponent(component, node)

	node.dataset[ROOT_KEY] = rootID
	DOM.empty(node)
	DOM.appendChild(node, renderedNode)
	rootID++
}

function mountComponent(component) {
	let markup = component.mountComponent()
	return markup
}

function receiveComponent(component, element) {
	let prevElement = component._currentElement
	if (prevElement === element) {
		return
	}
	component.receiveComponent(element)
}

function unmountComponent(component) {
	component.unmountComponent()
}

function update(element, node) {
	let id = node.dataset[ROOT_KEY]
	let instance = instancesByRoodID[id]

	let prevElem = instance._currentElement
	if (shouldUpdateComponent(prevElem, element)) {
		Reconciler.receiveComponent(instance, element)
	} else {
		unmountComponentAtNode(node)
		mount(element, node)
	}
}

function shouldUpdateComponent(prevElement, nextElement) {
	return prevElement.type === nextElement.type
}

const ROOT_KEY = "dlthmRootId"
const instancesByRoodID = {}
let rootID = 1

function isRoot(node) {
	if (node.dataset[ROOT_KEY]) {
		return true
	}
	return false
}
