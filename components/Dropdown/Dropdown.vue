
<template>
    <div class="dropdown" :class="{ className, 'dropdown--sub': role }">
    <span :class="{ [`dropdown__${(role) ? 'sub' : 'btn'}`]: true, [`dropdown__${(role) ? 'sub' : 'btn'}--active`]: !isHidden, [`${className}-df__btn`]: className, [`${className}-df__btn--active`]: !isHidden }"
          @click="_onToggle"
          @mouseenter="_onBtnEnter"
          @mouseleave="_onBtnLeave">
      <slot name="btn"></slot>
      <slot name="icon" v-if="isIcon">
        <svg v-if="isLoading"
             class="dropdown__icon dropdown__icon--spin"
             viewBox="0 0 512 512">
          <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
        </svg>
        <svg v-else
             class="dropdown__icon"
             :class="{ [`dropdown__icon--${align}`]: align }"
             viewBox="0 0 256 512">
            <path fill="currentColor" d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"></path>
        </svg>
      </slot>
    </span>
        <transition name="fade">
            <div v-if="!isHidden"
                 class="dropdown__body"
                 :id="id"
                 :style="{ minWidth: `${width}px`, top: `${top}px`, left: `${left}px` }"
                 :class="{ [`${className}-df__body`]: className }"
                 @click="_onBodyClick"
                 @mouseenter="_onBodyEnter"
                 @mouseleave="_onBodyLeave">
                <slot name="body"></slot>
            </div>
        </transition>
    </div>
</template>

<script src='./Dropdown.js'/>


<style src='./Dropdown.css'/>
