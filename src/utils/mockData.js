import IconEye from "assets/icons/TTM_Icon-Eye.svg";
// import IconLocked from "assets/icons/TTM_Icon-Locked.svg";
import IconEdit from "assets/icons/TTM_Icon-Edit.svg";
import IconDelete from "assets/icons/TTM_Icon-RubbishDelete.svg";
// import IconClipboard from "assets/icons/TTM_Icon-Clipboard.svg";
export const taskListData = [
  {
    id: 1,
    nameProject: "Abc",
    listNameTask: [
      {
        task: "Cv1",
        taskDetails: [
          {
            id: "content_c11",
            value:
              "Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1",
          },
        ],
        checked: true,
      },
      {
        task: "Cv2",
        taskDetails: [{ id: "content_c21", value: "Content 1" }],
        checked: false,
      },
    ],
    startDate: "22/12/2020",
    endDate: "28/12/2020",
  },
];

export const testPlan = [
  {
    projectName: "A",
    test_plan: { value: "Create ForgotPassword Page", progress: 60 },
    created: "28/07/2020",
    last_run: "In Progress",
    owner: "John Doe",
    priority: 2,
  },
  {
    projectName: "B",
    test_plan: { value: "Create Form Login", progress: 20 },
    created: "28/07/2020",
    last_run: "In Progress",
    owner: "John Doe",
    priority: 2,
  },
  {
    projectName: "C",
    test_plan: { value: "Create Form Register", progress: 0 },
    created: "28/07/2020",
    last_run: "22/05/2020",
    owner: "John Doe",
    priority: 2,
  },
];

export const iconsAction = [
  { name: IconEye, color: "blue" },
  { name: IconEdit, color: "green" },
  { name: IconDelete, color: "red" },
];
