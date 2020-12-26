import {
   TOGGLE_MENU,
   TOGGLE_THIRD_MENU,
   TOGGLE_FOURTH_MENU
} from 'actions/Types'

import menuItems from 'assets/Data/MenuItems';

const INITIAL_STATE = {
   navLinks: menuItems.data
}

export default (state = INITIAL_STATE, action) =>{
   switch(action.type){
      case TOGGLE_MENU:
         let navlinksArray = state.navLinks;
         let index = action.index;
         
         for (let i = 0; i < navlinksArray.length; i++) {
            if (i === index) {
               if (navlinksArray[index].isMenuOpen) {
                  // navlinksArray[index].isMenuOpen = false;
               } else {
                  navlinksArray[index].isMenuOpen = true;
               }
            } else {
               navlinksArray[i].isMenuOpen = false;
            }
         }
         return{ 
               ...state,
               navLinks: navlinksArray
            }

      case TOGGLE_THIRD_MENU:
         let navlinksArray1 = state.navLinks;
         let index1 = action.index;
         
         
         for (let i = 0; i < navlinksArray1.length; i++) {
            if(navlinksArray1[i].child_routes !== null){
               for( let j = 0; j < navlinksArray1[i].child_routes.length; j++){
                  if(navlinksArray1[i].child_routes[j].third_child_routes !== null){
                     if (j === index1) {
                        if (navlinksArray1[i].child_routes[index1].isMenuOpen) {
                           // navlinksArray1[i].child_routes[index1].isMenuOpen = false;
                        } else {
                           navlinksArray1[i].child_routes[index1].isMenuOpen = true;
                        }
                     } else {
                        navlinksArray1[i].child_routes[j].isMenuOpen = false;
                     }  
                  }

               }
            }
         }
         return{ ...state, navLinks: navlinksArray1 }

      case TOGGLE_FOURTH_MENU:
         let navlinksArray2 = state.navLinks;
         let index2 = action.index;
         for (let i = 0; i < navlinksArray2.length; i++) {
            if (navlinksArray2[i].child_routes !== null) {
               for (let j = 0; j < navlinksArray2[i].child_routes.length; j++) {
                  if (navlinksArray2[i].child_routes[j].third_child_routes !== null) {
                     for (let k = 0; k < navlinksArray2[i].child_routes[j].third_child_routes.length; k++) {
                        if (navlinksArray2[i].child_routes[j].third_child_routes[k].fourth_child_routes !== null) {
                           if (k === index2) {
                              if (navlinksArray2[i].child_routes[j].third_child_routes[index2].isMenuOpen) {
                                 // navlinksArray2[i].child_routes[j].third_child_routes[index2].isMenuOpen = false;
                              } else {
                                 navlinksArray2[i].child_routes[j].third_child_routes[index2].isMenuOpen = true;
                              }
                           } else {
                              navlinksArray2[i].child_routes[j].third_child_routes[k].isMenuOpen = false;
                           }
                        }
                     }
                  }
               }
            }
         }
         return { ...state, navLinks: navlinksArray2 }

      default:
         return{ ...state }
   }
}