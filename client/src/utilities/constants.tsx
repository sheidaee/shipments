/*
WAITING = 1,
ASSIGNED = 2,
PICKED_UP = 3,
DELIVERED = 4
*/
export const orderStatusCaptions: string[] = [
  'WAITING', 'ASSIGNED' , ' PICKED_UP', 'DELIVERED'
]

export const orderStatusItems = [
  { caption: "WAITING", value: "1" },
  { caption: "ASSIGNED", value: "2" },
  { caption: "PICKED_UP", value: "3" },
  { caption: "DELIVERED", value: "4" }
];

export const assigneeOptionsItems = [
  { caption: "Mike", value: "1" },
  { caption: "John", value: "2" },
  { caption: "Karim", value: "3" },
  { caption: "Sarah", value: "4" },
  { caption: "Nick", value: "5" },
  { caption: "Hector", value: "6" },
  { caption: "Tom", value: "7" },
  { caption: "Wes", value: "8" },
  { caption: "Scott", value: "9" },
  { caption: "Randy", value: "10" }
];

// General Page Section
export const ADMIN_HOME_PAGE = "/admin";

export const ASSIGNEE_HOME_PAGE = "/assignee";

export const LOGIN_PAGE = '/';
