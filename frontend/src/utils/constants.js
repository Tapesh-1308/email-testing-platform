export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const NAV_LIST = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Emails",
    path: "/emails",
  },
  {
    name: "Subscribers",
    path: "/subscribers",
  },
];

export const mockSubscribers = [
  {
    id: 1,
    name: "Tapesh",
    email: "tapesh.dua420@gmail.com",
    phone: "+91 9876543210",
    userId: 123512,
  },
  {
    id: 2,
    name: "Sakshi",
    email: "sakshi.dua420@gmail.com",
    phone: "+91 9876543210",
    userId: 123512,
  },
];

export const mockEmails = {
  total_emails: 5,
  totol_targeted_delivered: 25000,
  total_actual_delivered: 24200,
  total_targeted_opened: 12450,
  total_actual_opened: 12050,
  total_targeted_clicked: 5150,
  total_actual_clicked: 4980,

  data: [
    {
      id: "0",
      subjectName: "Your Weekly Digest",
      body: "<html><body><h1>Weekly Digest</h1><p>Here is your digest for this week.</p></body></html>",
      createdAt: "2024-04-10T09:00:00Z",
      analytics: {
        targeted: {
          deliveredCount: 3000,
          openedCount: 1000,
          clickedCount: 1000
        },
        actual: {
          deliveredCount: 1930,
          openedCount: 875,
          clickedCount: 550
        }
      }
    },
    {

      id: "1",
      subjectName: "Welcome to Our Newsletter",
      body: "<html><body><h1>Welcome!</h1><p>Thank you for subscribing to our newsletter.</p></body></html>",
      createdAt: "2024-05-10T14:30:00Z",
      analytics: {
        targeted: {
          deliveredCount: 5000,
          openedCount: 2500,
          clickedCount: 1000
        },
        actual: {
          deliveredCount: 4800,
          openedCount: 2400,
          clickedCount: 950
        }
      }
    },
    {
      id: "2",
      subjectName: "Monthly Update - May 2024",
      body: "<html><body><h1>Monthly Update</h1><p>Here are the highlights from May 2024.</p></body></html>",
      createdAt: "2024-05-01T10:00:00Z",
      analytics: {
        targeted: {
          deliveredCount: 4500,
          openedCount: 2200,
          clickedCount: 800
        },
        actual: {
          deliveredCount: 4300,
          openedCount: 2100,
          clickedCount: 780
        }
      }
    },
    {
      id: "3",
      subjectName: "Special Offer Inside!",
      body: "<html><body><h1>Special Offer</h1><p>Don't miss out on our exclusive offer.</p></body></html>",
      createdAt: "2024-04-25T16:45:00Z",
      analytics: {
        targeted: {
          deliveredCount: 6000,
          openedCount: 3000,
          clickedCount: 1500
        },
        actual: {
          deliveredCount: 5800,
          openedCount: 2900,
          clickedCount: 1450
        }
      }
    },
    {
      id: "4",
      subjectName: "Upcoming Events You Can't Miss",
      body: "<html><body><h1>Upcoming Events</h1><p>Check out these events happening soon.</p></body></html>",
      createdAt: "2024-05-12T08:15:00Z",
      analytics: {
        targeted: {
          deliveredCount: 4000,
          openedCount: 2000,
          clickedCount: 700
        },
        actual: {
          deliveredCount: 3800,
          openedCount: 1900,
          clickedCount: 650
        }
      }
    },
    {
      id: "5",
      subjectName: "Your Weekly Digest",
      body: "<html><body><h1>Weekly Digest</h1><p>Here is your digest for this week.</p></body></html>",
      createdAt: "2024-05-08T09:00:00Z",
      analytics: {
        targeted: {
          deliveredCount: 5500,
          openedCount: 2750,
          clickedCount: 1200
        },
        actual: {
          deliveredCount: 5300,
          openedCount: 2650,
          clickedCount: 1150
        }
      }
    },
  ]
};


export const getValuableDatasets = () => {
  const labels = mockEmails?.data?.map((email) =>
    new Date(email.createdAt).toLocaleDateString()
  );
  const deliveredData = mockEmails?.data?.map(
    (email) => email.analytics.actual.deliveredCount
  );
  const openedData = mockEmails?.data?.map(
    (email) => email.analytics.actual.openedCount
  );
  const clickedData = mockEmails?.data?.map(
    (email) => email.analytics.actual.clickedCount
  );

  return {
    labels,
    datasets: [
      {
        label: "Delivered",
        data: deliveredData,
        borderColor: "#F1B9B7",
        backgroundColor: "#F1B9B750",
        fill: false,
        tension: 0.4,
      },

      {
        label: "Opened",
        data: openedData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Clicked",
        data: clickedData,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: false,
        tension: 0.4,
      },
    ]
  }

}