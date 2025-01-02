// import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
//
// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css']
// })
// export class SidebarComponent {
//   @Input() isCollapsed: boolean = false; // Sidebar collapsed state
//
//   constructor(private el: ElementRef, private renderer: Renderer2) {}
//
//   toggleSidebar(): void {
//     this.isCollapsed = !this.isCollapsed; // Toggle state
//     const sidebar = this.el.nativeElement.querySelector('.main-nav');
//
//     if (this.isCollapsed) {
//       this.renderer.addClass(sidebar, 'collapsed');
//     } else {
//       this.renderer.removeClass(sidebar, 'collapsed');
//     }
//   }
// }
