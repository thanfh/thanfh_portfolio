
import { Profile, Project, ProjectCategory, GalleryCollection, PlaygroundSection } from './types';
import * as Assets from './assets';

export const PROFILE: Profile = {
  name: "Thanfh",
  role: "Multi-disciplinary Designer",
  tagline: "Crafting digital experiences at the intersection of art and technology.",
  bio: "I am a senior creative designer with over 8 years of experience specializing in 3D visualization, brand identity, and motion graphics. My work explores the relationship between organic forms and rigid digital structures, utilizing tools like Blender, Houdini, and React to bring concepts to life.",
  email: "hello.thanfh@gmail.com",
  socials: [
    { platform: "Facebook", url: "https://www.facebook.com/n.thanfh", iconName: "Facebook" },
    { platform: "Instagram", url: "https://www.instagram.com/n.thanfh/", iconName: "Instagram" },
    { platform: "Telegram", url: "https://t.me/nthanfh", iconName: "Telegram" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/th%C3%A0nh-nguy%E1%BB%85n-a99182228/?trk=opento_sprofile_goalscard", iconName: "Linkedin" }
  ]
};

export const PROFILE_VI: Profile = {
  ...PROFILE,
  role: "Nhà thiết kế đa lĩnh vực",
  tagline: "Kiến tạo trải nghiệm kỹ thuật số tại giao điểm của nghệ thuật và công nghệ.",
  bio: "Tôi là một nhà thiết kế sáng tạo cấp cao với hơn 8 năm kinh nghiệm chuyên về trực quan hóa 3D, nhận diện thương hiệu và đồ họa chuyển động. Các tác phẩm của tôi khám phá mối quan hệ giữa các hình thái hữu cơ và cấu trúc kỹ thuật số, sử dụng các công cụ như Blender, Houdini và React để hiện thực hóa các ý tưởng.",
};

export const DICTIONARY = {
  en: {
    nav_work: "Work",
    nav_draft: "Draft",
    nav_gallery: "Gallery",
    footer_text: "Let's work together.",
    rights_reserved: "All Rights Reserved.",
    tools_used: "Tools Used",
    client: "Client",
    view_live: "View Live Case Study",
    back_work: "Back to Work",
    view_all: "View All",
    view_less: "Show Less",
    challenge_title: "The Challenge",
    solution_title: "The Solution",
    cat_branding: "Branding Projects",
    cat_3d: "3D Projects",
    cat_2d: "2D Projects",
    cat_motion: "Motion Projects",
    confidential: "Confidential",
    selected_works: "Selected Works",
    view_all_projects: "View All Projects"
  },
  vi: {
    nav_work: "Dự án",
    nav_draft: "Bản nháp",
    nav_gallery: "Thư viện",
    footer_text: "Hãy cùng hợp tác.",
    rights_reserved: "Đã đăng ký bản quyền.",
    tools_used: "Công cụ sử dụng",
    client: "Khách hàng",
    view_live: "Xem dự án thực tế",
    back_work: "Quay lại",
    view_all: "Xem tất cả",
    view_less: "Thu gọn",
    challenge_title: "Thử thách",
    solution_title: "Giải pháp",
    cat_branding: "Dự án Thương hiệu",
    cat_3d: "Dự án 3D",
    cat_2d: "Dự án 2D",
    cat_motion: "Dự án Motion",
    confidential: "Bảo mật",
    selected_works: "Dự Án Tiêu Biểu",
    view_all_projects: "Xem Tất Cả Dự Án"
  }
};

export const LOFI_MUSIC_URL = Assets.AUDIO_LOFI_BG;
export const DISPLAY_CATEGORIES: ProjectCategory[] = ['All'];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Nebula Identity",
    category: "Branding",
    year: "2023",
    displayOrder: 1,
    star: 1,
    description: "A comprehensive brand overhaul for a fintech startup focused on decentralized finance.",
    description_vi: "Một cuộc cải tổ thương hiệu toàn diện cho một công ty khởi nghiệp fintech tập trung vào tài chính phi tập trung.",
    imageUrl: Assets.IMG_NEBULA_MAIN,
    tools: ["Illustrator", "Figma", "After Effects"],
    blocks: [
      {
        type: "text",
        id: "b1",
        title: "The Vision",
        title_vi: "Tầm nhìn",
        content: "Nebula aims to bridge the gap between complex blockchain technology and everyday financial usability. The goal was to create an identity that felt ethereal yet grounded, futuristic but accessible.\n\nWe started by exploring organic shapes that represent the 'nebula' concept—clouds of dust and gas where stars are born—and combined them with strict geometric grids to symbolize security and structure.",
        content_vi: "Nebula hướng tới việc thu hẹp khoảng cách giữa công nghệ blockchain phức tạp và khả năng sử dụng tài chính hàng ngày. Mục tiêu là tạo ra một bản sắc vừa thanh thoát vừa thực tế, tương lai nhưng dễ tiếp cận."
      },
      {
        type: "full-image",
        id: "b2",
        imageUrl: Assets.IMG_NEBULA_FULL,
        caption: "The new Nebula workspace environment."
      },
      {
        type: "two-column",
        id: "b3",
        leftTitle: "Logo System",
        leftTitle_vi: "Hệ thống Logo",
        leftContent: "The logo mark is constructed from three intersecting circles, representing the core pillars of the platform: Security, Speed, and Scalability. The intersection points create a starburst effect, nodding to the name 'Nebula'.",
        leftContent_vi: "Biểu tượng logo được xây dựng từ ba vòng tròn giao nhau, đại diện cho các trụ cột cốt lõi của nền tảng: Bảo mật, Tốc độ và Khả năng mở rộng.",
        rightImage: Assets.IMG_NEBULA_GRID_1
      },
      {
        type: "quote",
        id: "b4",
        text: "A brand that feels alive, breathing in the digital space.",
        text_vi: "Một thương hiệu sống động, hít thở trong không gian kỹ thuật số.",
        author: "Lead Designer"
      },
      {
        type: "image-grid",
        id: "b5",
        layout: "masonry",
        images: [
            Assets.IMG_NEBULA_UI_1,
            Assets.IMG_NEBULA_CARD,
            Assets.IMG_NEBULA_UI_2
        ]
      }
    ]
  },
  {
      id: "p2",
      title: "Flow State",
      category: "3D",
      year: "2024",
      displayOrder: 2,
      star: 1,
      description: "An exploration of fluid dynamics and soft-body physics using Houdini and Redshift.",
      description_vi: "Khám phá động lực học chất lỏng và vật lý vật thể mềm bằng Houdini và Redshift.",
      imageUrl: Assets.IMG_FLOW_MAIN,
      videoUrl: Assets.VID_CHROME_ARTIFACTS,
      tools: ["Houdini", "Redshift", "Nuke"],
      blocks: [
          {
             type: "two-column",
             id: "fs1",
             leftTitle: "Concept",
             leftContent: "Flow State is a personal R&D project investigating how viscous fluids interact with rigid obstacles. The simulation was driven by custom VEX scripts to control viscosity based on velocity.",
             rightContent: "Instead of standard water simulations, we wanted something that felt like 'digital mercury'—heavy, reflective, and mesmerizing. The lighting setup played a crucial role in highlighting the surface tension details."
          },
          {
             type: "image-grid",
             id: "fs2",
             layout: "pan-gallery",
             images: [
                 Assets.IMG_FLOW_PROCESS_1,
                 Assets.IMG_FLOW_PROCESS_2,
                 Assets.IMG_FLOW_RESULT_1,
                 Assets.IMG_FLOW_RESULT_2,
                 Assets.IMG_FLOW_GALLERY_1,
                 Assets.IMG_FLOW_GALLERY_2
             ]
          },
          {
              type: "text",
              id: "fs3",
              title: "Rendering",
              content: "Rendered in Redshift with ACES color space. The final composition was graded in DaVinci Resolve to enhance the contrast between the cool metallic fluids and the warm environmental lighting."
          }
      ]
  },
  {
      id: "p3",
      title: "Kinetic Pulse",
      category: "Motion",
      year: "2023",
      displayOrder: 3,
      star: 0,
      description: "Experimental typography and motion system for a music festival.",
      description_vi: "Hệ thống chuyển động và kiểu chữ thử nghiệm cho một lễ hội âm nhạc.",
      imageUrl: Assets.IMG_KINETIC_MAIN,
      videoUrl: Assets.VID_NEO_TOKYO,
      tools: ["After Effects", "Cinema 4D", "Octane"],
      blocks: [
          {
              type: "full-image",
              id: "k1",
              imageUrl: Assets.IMG_KINETIC_FRAME_1,
              caption: "Main Title Sequence"
          },
          {
              type: "image-grid",
              id: "k2",
              layout: "1-2",
              images: [
                  Assets.IMG_KINETIC_POSTER_1,
                  Assets.IMG_KINETIC_FRAME_2,
                  Assets.IMG_KINETIC_POSTER_2
              ]
          },
          {
              type: "text",
              id: "k3",
              title: "Rhythm & Type",
              content: "The motion language was derived from the BPM of the festival's headlining tracks. Every expansion, contraction, and rotation of the typography is synced to a 128 BPM grid."
          }
      ]
  },
  {
      id: "p4",
      title: "Urban Echo",
      category: "2D",
      year: "2022",
      displayOrder: 4,
      star: 0,
      description: "Editorial design and photography curation for an architectural magazine.",
      description_vi: "Thiết kế biên tập và giám tuyển nhiếp ảnh cho một tạp chí kiến trúc.",
      imageUrl: Assets.IMG_URBAN_MAIN,
      tools: ["Indesign", "Lightroom", "Photoshop"],
      blocks: [
          {
              type: "quote",
              id: "u1",
              text: "Architecture is frozen music.",
              text_vi: "Kiến trúc là âm nhạc đóng băng.",
              author: "Goethe"
          },
          {
              type: "image-grid",
              id: "u2",
              layout: "simple-2",
              images: [Assets.IMG_URBAN_DETAIL_1, Assets.IMG_URBAN_DETAIL_2]
          },
          {
              type: "two-column",
              id: "u3",
              leftContent: "The layout grid follows the golden ratio, providing a rigid structure that allows the photography to break free. Typography is set in Swiss grotesque fonts to maintain neutrality.",
              rightImage: Assets.IMG_URBAN_SKETCH
          }
      ]
  }
];

export const NAV_LINKS = [
  { label: "Work", href: "work", labelKey: "nav_work" },
  { label: "Gallery", href: "gallery", labelKey: "nav_gallery" },
  { label: "Draft", href: "draft", labelKey: "nav_draft" },
];

export const GALLERY_SECTIONS: GalleryCollection[] = [
    {
        id: "hanoi",
        title: "Hanoi Streetlife",
        location: "Hanoi, Vietnam",
        date: "Oct 2024",
        images: [
            { src: Assets.IMG_GAL_HN_1, width: 800, height: 1200, id: "hn1" },
            { src: Assets.IMG_GAL_HN_2, width: 1200, height: 800, id: "hn2" },
            { src: Assets.IMG_GAL_HN_3, width: 800, height: 800, id: "hn3" },
            { src: Assets.IMG_GAL_HN_4, width: 900, height: 600, id: "hn4" },
            { src: Assets.IMG_GAL_HN_5, width: 600, height: 900, id: "hn5" },
            { src: Assets.IMG_GAL_HN_6, width: 1000, height: 500, id: "hn6" },
        ]
    },
    {
        id: "tokyo",
        title: "Tokyo Drift",
        location: "Shibuya, Japan",
        date: "Dec 2023",
        images: [
            { src: Assets.IMG_GAL_JP_1, width: 800, height: 600, id: "jp1" },
            { src: Assets.IMG_GAL_JP_2, width: 600, height: 800, id: "jp2" },
            { src: Assets.IMG_GAL_JP_3, width: 1200, height: 800, id: "jp3" },
            { src: Assets.IMG_GAL_JP_4, width: 800, height: 800, id: "jp4" },
            { src: Assets.IMG_GAL_JP_5, width: 600, height: 600, id: "jp5" },
        ]
    },
    {
        id: "abstract",
        title: "Light & Shadow",
        location: "Studio",
        date: "Ongoing",
        images: [
            { src: Assets.IMG_GAL_ABS_1, width: 800, height: 1000, id: "abs1" },
            { src: Assets.IMG_GAL_ABS_2, width: 1000, height: 800, id: "abs2" },
            { src: Assets.IMG_GAL_ABS_3, width: 800, height: 800, id: "abs3" },
            { src: Assets.IMG_GAL_ABS_4, width: 600, height: 900, id: "abs4" },
        ]
    }
];

export const PLAYGROUND_SECTIONS: PlaygroundSection[] = [
  {
    id: "posters",
    title: "Daily Posters",
    description: "Graphic exploration, typography drills, and composition studies.",
    items: [
      { id: "pg1", title: "Typo 01", src: Assets.IMG_PG_1, width: 800, height: 1200, tag: "Typography" },
      { id: "pg2", title: "Chaos", src: Assets.IMG_PG_2, width: 800, height: 1000, tag: "Abstract" },
      { id: "pg3", title: "Neo", src: Assets.IMG_PG_3, width: 800, height: 800, tag: "Cyber" },
      { id: "pg4", title: "Void", src: Assets.IMG_PG_4, width: 800, height: 1200, tag: "3D" },
      { id: "pg5", title: "Fluid", src: Assets.IMG_PG_5, width: 800, height: 600, tag: "Simulation" },
    ]
  },
  {
    id: "experiments",
    title: "Visual Labs",
    description: "R&D for textures, lighting, code-art, and shaders.",
    items: [
       { id: "ex1", title: "Urban", src: Assets.IMG_PG_6, width: 800, height: 800, tag: "Photo" },
       { id: "ex2", title: "Geo", src: Assets.IMG_PG_7, width: 800, height: 1100, tag: "Vector" },
       { id: "ex3", title: "Organic", src: Assets.IMG_PG_8, width: 800, height: 900, tag: "Nature" },
       { id: "ex4", title: "Mono", src: Assets.IMG_PG_9, width: 800, height: 800, tag: "BW" },
       { id: "ex5", title: "Kinetic", src: Assets.IMG_PG_10, width: 800, height: 1200, tag: "Motion" },
    ]
  }
];
