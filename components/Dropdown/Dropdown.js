export default {
	name: 'dropdown',
	props: {
		role: {
			type: String,
			required: false,
			default: ''
		},
		unscroll: {
			type: [HTMLElement, String],
			required: false,
			default: null
		},
		align: {
			type: String,
			required: false,
			default: 'bottom'
		},
		x: {
			type: Number,
			required: false,
			default: 0
		},
		y: {
			type: Number,
			required: false,
			default: 0
		},
		beforeOpen: {
			type: Function,
			required: false,
			default: resolve => resolve()
		},
		trigger: {
			type: String,
			required: false,
			default: 'click'
		},
		closeOnClick: {
			type: Boolean,
			required: false,
			default: false
		},
		isIcon: {
			type: Boolean,
			required: false,
			default: true
		},
		className: {
			type: String,
			required: false,
			default: ''
		},
	},
	data() {
		return {
			isHidden: true,
			isLoading: false,
			id: null,
			timeout: null,
			top: undefined,
			right: undefined,
			bottom: undefined,
			left: undefined,
			width: undefined
		}
	},
	watch: {
		isHidden(isHidden) {
			if (this.unscroll) {
				const el = (this.unscroll instanceof HTMLElement) ?
					this.unscroll : document.querySelector(this.unscroll);
				if (el) {
					el.style.overflow = (!isHidden) ? 'hidden' : '';
				}
			}
		}
	},
	created() {
		const $root = this.$root;
		// --- hide dropdown if other dropdowns show
		// --- or document clicked
		$root.$on('df-dropdown:open', () => this.isHidden = true);
		$root.$on('df-dropdown:hide', () => this.isHidden = true);
		// --- hide dropdown on document click event
		if (this.trigger === 'click' && !$root['is-df-dropdown']) {
			Object.defineProperty($root, 'is-df-dropdown', {
				enumerable: false,
				configurable: false,
				writable: false,
				value: true
			});
			document.onmousedown = (e) => {
				const target = e.target;
				const dropdown = target.closest('.df-dropdown__btn') || target.closest('.df-dropdown__body');
				if (!dropdown) {
					$root.$emit('df-dropdown:hide');
				}
			}
		}
		this.id = 'df-dropdown-' + this.generateRandomId();
	},
	methods: {
		// --- generate random id for query selector
		generateRandomId() {
			return Math.random().toString(36).substr(2, 10);
		},
		_onToggle(e) {
			if (this.trigger !== 'click') {
				return;
			}
			this.checkCustomCallback(e);
		},
		_onBtnEnter(e) {
			if (this.trigger !== 'hover' || !this.isHidden) {
				return;
			}
			this.checkCustomCallback(e);
		},
		_onBtnLeave(e) {
			if (this.trigger !== 'hover') {
				return;
			}
			if (this.role) {
				this.timeout = setTimeout(() => this.isHidden = true, 100);
			}
			const to = e.toElement;
			if (!to) {
				return;
			}
			const isDropdown = to.closest('.df-dropdown__btn') || to.closest('.df-dropdown__body');
			if (isDropdown) {
				return;
			}
			this.prepare();
		},
		_onBodyClick() {
			if (this.closeOnClick) {
				this.isHidden = true;
			}
		},
		_onBodyEnter() {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
		},
		_onBodyLeave(e) {
			if (this.trigger !== 'hover') {
				return;
			}
			const to = e.toElement;
			if (!to) {
				return;
			}
			if (to.closest('.df-dropdown__btn') || to.closest('.df-dropdown__sub')) {
				return;
			}
			this.prepare();
		},
		checkCustomCallback(e) {
			if (!this.isHidden) {
				this.prepare();
				return;
			}
			// --- custom callback before open
			const promise = new Promise(resolve => {
				this.isLoading = true;
				this.beforeOpen.call(this, resolve);
			});
			promise.then(() => {
				this.isLoading = false;
				if (!e.target.closest('.df-dropdown__body')) {
					// --- hide dropdown if other dropdowns show
					this.$root.$emit('df-dropdown:open');
				}
				setTimeout(this.prepare, 0);
			});
			promise.catch(() => {
				throw Error('df-dropdown promise error')
			});
		},
		prepare() {
			this.isHidden = !this.isHidden;
			if (!this.isHidden) {
				this.$nextTick(() => {
					const button = this.$el.firstElementChild;
					const container = document.getElementById(this.id);
					this.setWidth(button.offsetWidth);
					this.setPosition(button, container);
				});
			}
		},
		setWidth(width) {
			this.width = width;
		},
		setPosition(btn, body) {
			if (!btn || !body) {
				return;
			}
			const coords = this.getCoords(btn);
			// --- current position
			const currentTop = coords.top;
			const currentLeft = coords.left;
			// --- btn size
			const btnWidth = btn.offsetWidth;
			const btnHeight = btn.offsetHeight;
			// --- body size
			const bodyWidth = body.offsetWidth;
			const bodyHeight = body.offsetHeight;
			switch (this.align) {
				case 'top':
					this.top = (currentTop + pageYOffset - bodyHeight);
					this.left = (currentLeft + pageXOffset);
					break;
				case 'right':
					this.top = (currentTop + pageYOffset);
					this.left = (currentLeft + pageXOffset + btnWidth);
					break;
				case 'bottom':
					this.top = (currentTop + pageYOffset + btnHeight);
					this.left = (currentLeft + pageXOffset);
					break;
				case 'left':
					this.top = (currentTop + pageYOffset);
					this.left = (currentLeft + pageXOffset - bodyWidth);
					break;
				default:
					this.top = (currentTop + pageYOffset + btnHeight);
					this.left = (currentLeft + pageXOffset);
					break;
			}
			this.top += this.y;
			this.left += this.x;
		},
		getCoords(el) {
			el = el.getBoundingClientRect();
			return {
				top: el.top - pageYOffset,
				left: el.left - pageXOffset
			};
		}
	}
}
