export function Badge({text, leftIcon, color = 'indigo', rightIcon}){
  let leftsvg= '';
  let rightsvg = '';

  let colorClass = '';

  switch (color) {
  case 'blue':
    colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    break;
  case 'red':
    colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    break;
  case 'green':
    colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    break;
  case 'yellow':
    colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    break;
  case 'indigo':
    colorClass = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
    break;
  case 'purple':
    colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    break;
  case 'pink':
    colorClass = 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
    break;
  case 'gray':
    colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    break;
  default:
    colorClass = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
    break;
  }

  switch (leftIcon) {
  case 'people':
    leftsvg = 'M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z';
    break;
  case 'calendar':
    leftsvg = 'M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z';
    break;
  case 'star':
    leftsvg = 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z';
    break;
  default:
    break;
  }



  switch (rightIcon) {
  case 'people':
    rightsvg = 'M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z';
    break;
  default:
    break;
  }

  return(
    <div>
      <span className={colorClass + ' text-xs font-medium inline-flex items-center px-2 py-1 rounded me-2 gap-1'}>
        {
          leftsvg !== '' && (
            <svg className="flex w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d={leftsvg} clipRule="evenodd"/>
            </svg>
          )
        }
        {text}
        {
          rightsvg !== '' && (
            <svg className="flex w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d={rightsvg} clipRule="evenodd"/>
            </svg>
          )
        }
      </span>

    </div>
  );
}