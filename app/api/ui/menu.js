let routes = [
    {
      key: "home",
      name: "Home",
      icon: "ion-ios-home",
      linkParent: "/app",
    },
    {
      key: "system_admins",
      name: "Users",
      icon: "ion-ios-people",
      linkParent: "/app/users",
    },
    {
      key: "staff",
      name: "Analytics",
      icon: "ion-ios-call",
      linkParent: "/app/analytics",
    },
    {
      key: "hot-drops",
      name: "Hot Drops",
      icon: "ion-ios-list-box",
      child: [
        {
          key: "all-hotdrops",
          name: "All Hot Drops",
          link: "/app/hot-drops",
        },
        {
          key: "add-hotdrops",
          name: "Add Hot Drops",
          link: "/app/add-hot-drops",
        }
      ]
    },
    {
      key: "rairty-tools",
      name: "Rairty Tools",
      icon: "ion-ios-list-box",
      child: [
        {
          key: "all-rairtytools",
          name: "All Rairty Tools",
          link: "/app/rairty-tools",
        },
        {
          key: "add-rairtytools",
          name: "Add Rairty Tools",
          link: "/app/add-rairtytools",
        }
      ]
    },
    {
      key: "nft-official-projects",
      name: "Nft Official Projects",
      icon: "ion-md-car",
      child: [
        {
          key: "all-nft-official-projects",
          name: "All Nft Official Projects",
          link: "/app/nft-official-projects",
        },
        {
          key: "add-nft-official-projects",
          name: "Add Nft Official Projects",
          link: "/app/add-nft-official-projects",
        }
      ]
    },
    {
      key: "company_houses",
      name: "Feedbacks",
      icon: "ion-md-home",
      linkParent: "/app/feedbacks",
    },
    // {
    //   key: "timesheets",
    //   name: "Timesheets",
    //   icon: "ion-ios-paper",
    //   child: [
    //     {
    //       key: "1a",
    //       name: "1A",
    //       title: true,
    //     },
    //     {
    //       key: "hgv_accountancy_paid",
    //       name: "HGV Accountancy Paid",
    //       link: "/app/hgv-accountancy-paid",
    //       icon: "ion-ios-contact-outline",
    //     },
    //     {
    //       key: "1b",
    //       name: "1B",
    //       title: true,
    //     },
    //     {
    //       key: "drivers_own_self_paid",
    //       name: "Driver's Own (Self Paid)",
    //       link: "/app/driver-own-self-paid",
    //       icon: "ion-ios-contact-outline",
    //     },
    //     {
    //       key: "2a",
    //       name: "2A",
    //       title: true,
    //     },
    //     {
    //       key: "invoice_managed_by_the_driver",
    //       name: "Invoice Managed By The Driver",
    //       link: "/app/invoice-managed-by-the-driver",
    //       icon: "ion-ios-contact-outline",
    //     },
    //     {
    //       key: "2b",
    //       name: "2B",
    //       title: true,
    //     },
    //     {
    //       key: "agency_self_bill",
    //       name: "Agency Self Bil",
    //       link: "/app/agency-self-bill",
    //       icon: "ion-ios-contact-outline",
    //     },
    //     {
    //       key: "3a",
    //       name: "3A",
    //       title: true,
    //     },
    //     {
    //       key: "enhanced_driver",
    //       name: "Enhanced Driver",
    //       link: "/app/enhanced-driver",
    //       icon: "ion-ios-contact-outline",
    //     },
    //     // {
    //     //   key: "3b",
    //     //   name: "3B",
    //     //   title: true,
    //     // },
    //     // {
    //     //   key: "timesheet_shift",
    //     //   name: "Shift",
    //     //   link: "/app/shift",
    //     //   icon: "ion-ios-contact-outline",
    //     // },
    //   ],
    // },
  ];

module.exports = routes;
