export function updateActiveMenu(menuItem: string) {
    localStorage.setItem('activeMenu', menuItem);
    window.dispatchEvent(new CustomEvent('activeMenuChanged', { detail: menuItem }));
  }
  
  