const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const Board = require("./models/board");
const Column = require("./models/column");
const Task = require("./models/task");
const Subtask = require("./models/subtask");

const boards = [
  {
    name: "Platform Launch",
    id: "86187315-055c-49cf-aed0-c7e7480d2648",
    columns: [
      {
        name: "Todo",
        id: "ff63760e-825a-47ca-ac2f-bae339439ffd",
        tasks: [
          {
            id: "5284a6f1-6c61-486f-9571-13ea3b825eec",
            title: "Build UI for onboarding flow",
            description: "",
            status: "Todo",
            subtasks: [
              {
                id: "29dc7489-17b4-4286-8894-5ba5bfe1f125",
                title: "Sign up page",
                isCompleted: true,
              },
              {
                id: "ba97f00d-4461-4d99-a87d-76a3b2b9804a",
                title: "Sign in page",
                isCompleted: false,
              },
              {
                id: "00265ee1-e8d7-4843-8088-15eea8862897",
                title: "Welcome page",
                isCompleted: false,
              },
            ],
          },
          {
            id: "356af719-07f4-423b-96e6-f94e1ed5e0fe",
            title: "Build UI for search",
            description: "",
            status: "Todo",
            subtasks: [
              {
                id: "c0b56484-70f8-4f15-9a3b-137a2334a349",
                title: "Search page",
                isCompleted: false,
              },
            ],
          },
          {
            id: "649eea93-192b-4dc2-85ee-9940292dd35f",
            title: "Build settings UI",
            description: "",
            status: "Todo",
            subtasks: [
              {
                id: "6792dddb-49e3-4bc6-a0c8-fc781f212baa",
                title: "Account page",
                isCompleted: false,
              },
              {
                id: "a8a5598b-11e0-4010-b79b-20960e670f94",
                title: "Billing page",
                isCompleted: false,
              },
            ],
          },
          {
            id: "8a28a4d2-5551-40f7-aa68-756c4af56c02",
            title: "QA and test all major user journeys",
            description:
              "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
            status: "Todo",
            subtasks: [
              {
                id: "04ea0465-bcfb-4d3a-aa64-e3b0d01ef054",
                title: "Internal testing",
                isCompleted: false,
              },
              {
                id: "8a08a528-0535-4a35-b59a-bf96c0dad39a",
                title: "External testing",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: "Doing",
        id: "57c897df-bd51-4d76-adeb-57fa8ce2c870",
        tasks: [
          {
            id: "0a1a0fb0-9734-4ac4-9a26-1a059e9fabc4",
            title: "Design settings and search pages",
            description: "",
            status: "Doing",
            subtasks: [
              {
                id: "b729b46f-e21a-42d2-be35-a4a919db2470",
                title: "Settings - Account page",
                isCompleted: true,
              },
              {
                id: "8c968ba5-2581-45e2-bbe1-5a9d50e7e8d2",
                title: "Settings - Billing page",
                isCompleted: true,
              },
              {
                id: "3575d752-ab0f-4091-99c9-41e33da11bfa",
                title: "Search page",
                isCompleted: false,
              },
            ],
          },
          {
            id: "052d50b4-aa70-40ca-9514-c372d613c534",
            title: "Add account management endpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                id: "1346b30a-b5c4-47c2-abb8-73897b8b4899",
                title: "Upgrade plan",
                isCompleted: true,
              },
              {
                id: "43088be0-f613-47bf-bf05-6adea0ea84cb",
                title: "Cancel plan",
                isCompleted: true,
              },
              {
                id: "363e4727-1d8c-4ec6-b3bf-aa79ef17ad0d",
                title: "Update payment method",
                isCompleted: false,
              },
            ],
          },
          {
            id: "d0f4a1fd-a87c-414b-80aa-fd466303d3af",
            title: "Design onboarding flow",
            description: "",
            status: "Doing",
            subtasks: [
              {
                id: "f565c787-62c3-4cc0-baf2-4706e7a54eba",
                title: "Sign up page",
                isCompleted: true,
              },
              {
                id: "96d2669b-d764-4d65-87c9-f2bfc37ec5b7",
                title: "Sign in page",
                isCompleted: false,
              },
              {
                id: "7488fbdf-4b95-4fb4-9e11-56efaec1ed5d",
                title: "Welcome page",
                isCompleted: false,
              },
            ],
          },
          {
            id: "bad64a98-999c-41d1-81b4-ee98a310e4cf",
            title: "Add search enpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                id: "905b2bc8-e5d1-45d6-a7a4-e7c49e21c2b3",
                title: "Add search endpoint",
                isCompleted: true,
              },
              {
                id: "3a3a9150-3e48-4b7f-82bc-97c53664bc53",
                title: "Define search filters",
                isCompleted: false,
              },
            ],
          },
          {
            id: "4b9a162e-bc63-422f-96ef-1116b978b3dc",
            title: "Add authentication endpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                id: "5f509396-0ca1-4a7f-85bd-de1b3663a5b2",
                title: "Define user model",
                isCompleted: true,
              },
              {
                id: "5e7791ef-e375-4243-95ae-a1d1711362d6",
                title: "Add auth endpoints",
                isCompleted: false,
              },
            ],
          },
          {
            id: "12911237-5bc9-4643-90ec-71898d264f7b",
            title:
              "Research pricing points of various competitors and trial different business models",
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            status: "Doing",
            subtasks: [
              {
                id: "43d476cd-fe3f-4b5d-a312-f3109211d8c5",
                title: "Research competitor pricing and business models",
                isCompleted: true,
              },
              {
                id: "18a83b9e-9301-43c6-a8f0-f236235da4ca",
                title: "Outline a business model that works for our solution",
                isCompleted: false,
              },
              {
                id: "eb80835a-efca-4447-a0e4-dfaaaeb6be08",
                title:
                  "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: "Done",
        id: "03b51325-b021-4b6c-b6e3-3b228457bbce",
        tasks: [
          {
            id: "24449475-ded2-4d84-888e-ae1ac47c2abf",
            title: "Conduct 5 wireframe tests",
            description:
              "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
            status: "Done",
            subtasks: [
              {
                id: "085a9ebd-f12e-4f7f-9a65-9de5aa56eeeb",
                title: "Complete 5 wireframe prototype tests",
                isCompleted: true,
              },
            ],
          },
          {
            id: "d000af5d-83a1-402f-b3b6-172945541875",
            title: "Create wireframe prototype",
            description:
              "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
            status: "Done",
            subtasks: [
              {
                id: "ea7a16e5-f864-4edc-9080-4588a296cd08",
                title: "Create clickable wireframe prototype in Balsamiq",
                isCompleted: true,
              },
            ],
          },
          {
            id: "279c7610-e4ef-43bd-b65d-dafb1aef1df6",
            title: "Review results of usability tests and iterate",
            description:
              "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
            status: "Done",
            subtasks: [
              {
                id: "9fc18e86-b38a-4e86-b0c3-7d87708b7bfb",
                title:
                  "Meet to review notes from previous tests and plan changes",
                isCompleted: true,
              },
              {
                id: "360ecece-bfae-46f3-a4a3-24d612b4359d",
                title: "Make changes to paper prototypes",
                isCompleted: true,
              },
              {
                id: "4caea2ba-994a-43ae-bbd0-95dd04e86602",
                title: "Conduct 5 usability tests",
                isCompleted: true,
              },
            ],
          },
          {
            id: "429c6960-e00a-46a4-b3ca-3f7f76918de3",
            title:
              "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "",
            status: "Done",
            subtasks: [
              {
                id: "e11093db-bc03-4d81-af6c-c025a09dc52d",
                title: "Create paper prototypes for version one",
                isCompleted: true,
              },
              {
                id: "af1aad62-75a5-40ec-8f8b-eba313542c91",
                title: "Complete 10 usability tests",
                isCompleted: true,
              },
            ],
          },
          {
            id: "b94d6798-5801-40d9-a066-1dc5b2da177a",
            title: "Market discovery",
            description:
              "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
            status: "Done",
            subtasks: [
              {
                id: "01e35345-ad8a-4321-bf36-56429843dc37",
                title: "Interview 10 prospective customers",
                isCompleted: true,
              },
            ],
          },
          {
            id: "e0d128c0-0b6d-4f38-9f87-e7aaf6e7d2a7",
            title: "Competitor analysis",
            description: "",
            status: "Done",
            subtasks: [
              {
                id: "f2616af5-dd4c-4464-a843-25d7f87338fe",
                title: "Find direct and indirect competitors",
                isCompleted: true,
              },
              {
                id: "d6c23089-2fe3-425e-8127-165147e5f889",
                title: "SWOT analysis for each competitor",
                isCompleted: true,
              },
            ],
          },
          {
            id: "b53b5332-9b3b-4450-a7e1-20443e234dbb",
            title: "Research the market",
            description:
              "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            subtasks: [
              {
                id: "767cf05c-31af-4670-b0a8-b590cdc54ca9",
                title: "Write up research analysis",
                isCompleted: true,
              },
              {
                id: "ccc46efd-43d5-40e4-a94f-d40464878f10",
                title: "Calculate TAM",
                isCompleted: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Marketing Plan",
    id: "eaf6c736-a9f6-44af-beee-293fe4c48898",
    columns: [
      {
        name: "Todo",
        id: "a7f0f75d-6005-442a-a58d-dec8ec7c31d1",
        tasks: [
          {
            id: "5d2198ad-d85a-43d4-a5c5-8aff222e458f",
            title: "Plan Product Hunt launch",
            description: "",
            status: "Todo",
            subtasks: [
              {
                id: "012f6fda-e0d4-4fa0-9e89-46ec1de976fa",
                title: "Find hunter",
                isCompleted: false,
              },
              {
                id: "79f55b38-0da7-4ab4-bb2f-2b1a7e34e00e",
                title: "Gather assets",
                isCompleted: false,
              },
              {
                id: "e649af4c-7312-452e-8948-d688631b6faf",
                title: "Draft product page",
                isCompleted: false,
              },
              {
                id: "40dcf697-d90e-4d63-a011-8f774ba28f4f",
                title: "Notify customers",
                isCompleted: false,
              },
              {
                id: "c2833b41-09fb-4cbb-8361-064b6579242f",
                title: "Notify network",
                isCompleted: false,
              },
              {
                id: "84a231bb-a942-4de5-9e62-e4c90fe6fe9f",
                title: "Launch!",
                isCompleted: false,
              },
            ],
          },
          {
            id: "32dff035-c8be-420e-a8bc-506b07e61331",
            title: "Share on Show HN",
            description: "",
            status: "",
            subtasks: [
              {
                id: "60632960-619f-4cc6-b61f-8445e474bb08",
                title: "Draft out HN post",
                isCompleted: false,
              },
              {
                id: "1728020d-3f55-46f5-a75f-4816300696ee",
                title: "Get feedback and refine",
                isCompleted: false,
              },
              {
                id: "4be287ef-ee1b-47b9-a7da-ec96e4fe2085",
                title: "Publish post",
                isCompleted: false,
              },
            ],
          },
          {
            id: "3850e2b1-a6c6-432d-a508-7956c3a8980b",
            title: "Write launch article to publish on multiple channels",
            description: "",
            status: "",
            subtasks: [
              {
                id: "8b037828-34da-41a9-89f8-6a1325014160",
                title: "Write article",
                isCompleted: false,
              },
              {
                id: "c9597e2d-11cc-497c-8431-9f1cfdd242ef",
                title: "Publish on LinkedIn",
                isCompleted: false,
              },
              {
                id: "46ff928c-f6d2-4975-bf9a-84989980094a",
                title: "Publish on Inndie Hackers",
                isCompleted: false,
              },
              {
                id: "eb872706-eacd-49ea-a71e-54d94b99e26f",
                title: "Publish on Medium",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: "Doing",
        id: "02e32a1d-84cd-4460-8fb0-610d4f4667ef",
        tasks: [],
      },
      {
        name: "Done",
        id: "d08eb405-14d6-43cd-8e63-5f682eae9505",
        tasks: [],
      },
    ],
  },
  {
    name: "Roadmap",
    id: "22713056-9985-43cc-a3b4-f3cb78e6d425",
    columns: [
      {
        name: "Now",
        id: "f53db45a-943d-4770-b5de-e6d78fc7f96f",
        tasks: [
          {
            id: "429ffa94-2d3a-498e-be51-98d1c4ebd06e",
            title: "Launch version one",
            description: "",
            status: "Now",
            subtasks: [
              {
                id: "d6e5311d-7bca-4ad6-b934-4e6a218cc875",
                title: "Launch privately to our waitlist",
                isCompleted: false,
              },
              {
                id: "a08c2994-a941-430e-a3ff-378817215c25",
                title: "Launch publicly on PH, HN, etc.",
                isCompleted: false,
              },
            ],
          },
          {
            id: "a44cb751-cc6e-4008-b2c7-1129e1fe06ad",
            title: "Review early feedback and plan next steps for roadmap",
            description:
              "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
            status: "Now",
            subtasks: [
              {
                id: "3468dfd2-a237-4f2e-9045-53bb0131e32f",
                title: "Interview 10 customers",
                isCompleted: false,
              },
              {
                id: "c40dedab-19a5-4f84-8a3c-ad3df827e349",
                title: "Review common customer pain points and suggestions",
                isCompleted: false,
              },
              {
                id: "540fd5c2-aa38-4adb-8933-de4efac86c76",
                title: "Outline next steps for our roadmap",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        name: "Next",
        id: "a731f71e-a51d-47d6-bfe9-e471d21e7638",
        tasks: [],
      },
      {
        name: "Later",
        id: "072bba72-e015-4d98-81d9-1171aac69a28",
        tasks: [],
      },
    ],
  },
];

async function populateDatabase() {
  const user = new User({
    username: "guest",
    password: await bcrypt.hash("guest", 10),
  });
  await user.save();

  for (const b of boards) {
    console.log("Creating", b.name);
    const board = new Board();

    for (const c of b.columns) {
      const column = new Column();

      for (const t of c.tasks) {
        const task = new Task();

        for (const st of t.subtasks) {
          const subtask = new Subtask();
          subtask.title = st.title;
          subtask.isCompleted = st.isCompleted;
          subtask.taskId = task._id;
          subtask.userId = user._id;
          await subtask.save();
        }

        task.title = t.title;
        task.description = t.description;
        task.columnId = column._id;
        task.userId = user._id;

        await task.save();
      }

      column.name = c.name;
      column.boardId = board._id;
      column.userId = user._id;

      await column.save();
    }

    board.name = b.name;
    board.userId = user._id;

    await board.save();
  }
}

mongoose.connect("mongodb://127.0.0.1:27017/kanban").then(() => {
  console.log("Connected to mongodb\nPopulating db");
  populateDatabase()
    .then(() => {
      console.log("Database population completed.");
      mongoose.disconnect();
    })
    .catch((error) => {
      console.error("Error populating database:", error);
      mongoose.disconnect();
    });
});
