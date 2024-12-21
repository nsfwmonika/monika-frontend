export interface ImageItem {
    result: string;
    original: string;
    prompt:string;
    child: any[];
  }
  
  export const images: ImageItem[] = [
    {
      result: '/img/a-1.png',
      original: '/img/b-1.jpg',
      prompt:'By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. This picture depicts a muscular, white-haired male warrior with red tribal markings, holding a sword. The dramatic lighting and moody color palette evoke a sense of tension and readiness, characteristic of contemporary fantasy art.',
      child: ['/img/a-1.png', '/img/b-1.jpg']
    },
    {
      result: '/img/a-2.png',
      original: '/img/b-2.jpg',
      prompt:"By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. He features a character with spiky white hair and a blindfold, symbolizing mystery and introspection. The use of light and shadow creates depth, while the blue sky contrasts with the dark attire, enhancing the character's enigmatic presence.",
      child: ['/img/a-2.png', '/img/b-2.jpg']
    },
    {
      result: '/img/a-3.png',
      original: '/img/b-3.jpg',
      prompt:"By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style.  The use of vibrant, glowing blue tones contrasts with the dark background, emphasizing the character's mystical aura. The light source appears to emanate from the character's weapon and hair, creating an otherworldly ambiance.",
      child: ['/img/a-3.png','/img/b-3.jpg' ]
    },
    {
      result: '/img/a-4.png',
      original: '/img/b-4.jpg',
      prompt:"By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. The composition is dynamic, with the subject slightly off-center, creating a sense of movement. The color palette is vibrant yet balanced, with the deep blue sky contrasting the character's dark attire. The light source is natural, highlighting the character's features and casting subtle shadows.",
      child: ['/img/a-4.png', '/img/b-4.jpg']
    },
    {
      result: '/img/a-5.png',
      original: '/img/b-5.png',
      prompt:"By utilizing style transfer, we convert a real-life beautiful woman into a two-dimensional (2D) anime-style image, achieving a transformation from photorealism to anime. This digital artwork portrays a young woman in a revealing red outfit, standing beside a Christmas tree adorned with ornaments. The composition centers her figure, emphasizing her curves and the glossy texture of her clothing. The use of light accentuates her smooth skin and the softness of her hair, creating a contrast with the more rigid, festive elements around her.",
      child: ['/img/a-5.png', '/img/b-5.png']
    },
    {
        result: '/img/a-7.png',
        original: '/img/b-7.png',
        prompt:"By utilizing style transfer, we convert a real-life beautiful woman into a two-dimensional (2D) anime-style image, achieving a transformation from photorealism to anime. This digital artwork portrays she with a confident, contemplative expression, rendered in a semi-realistic style. The use of soft, muted colors and subtle lighting creates a serene, introspective mood.",
        child: ['/img/a-7.png','/img/b-7.png' ]
      },{
        result: '/img/a-8.png',
        original: '/img/b-8.png',
        prompt:"By utilizing face swapping technology, we replaced her facial features with those of another girl, achieving face replacement while keeping the rest of the image unchanged. This photograph captures a blonde woman in a yellow bikini, set against a serene pool backdrop. The composition focuses on her, with a shallow depth of field blurring the background. The lighting is natural, highlighting her smooth skin and creating a soft, inviting glow.",
        child: ['/img/a-8.png','/img/b-8.png' ]
      },{
        result: '/img/a-9.png',
        original: '/img/b-9.jpg',
        prompt:"By utilizing style transfer, we convert Musk into a two-dimensional (2D) anime-style image, achieving a transformation from photorealism to anime. This digital artwork portrays Musk in a sleek, tailored black suit, embodying a modern, sophisticated aesthetic.",
        child: ['/img/a-9.png','/img/b-9.jpg' ]
      },{
        result: '/img/a-10.png',
        original: '/img/b-10.jpg',
        prompt:"By utilizing style transfer, we convert Musk into a two-dimensional (2D) anime-style image, achieving a transformation from photorealism to anime. This digital artwork portrays Musk in a sleek, tailored black suit, embodying a modern, sophisticated aesthetic. The composition is balanced, with the subject centrally positioned, drawing the viewer's focus immediately. The use of light and shadow enhances the three-dimensionality of the figure, creating a realistic depth.",
        child: ['/img/a-10.png','/img/b-10.jpg']
      },{
        result: '/img/a-11.png',
        original: '/img/b-11.png',
        prompt:"By utilizing face swapping technology, we replaced her facial features with those of another girl, achieving face replacement while keeping the rest of the image unchanged. The composition centers her, emphasizing her calm, introspective expression. The soft, natural light enhances the serene atmosphere, while the muted color palette contrasts with the subtle gold accents, creating a harmonious balance. ",
        child: ['/img/a-11.png','/img/b-11.png']
      },{
        result: '/img/a-12-1.png',
        original: '/img/a-12-2.png',
        prompt:"By utilizing face swapping technology, we replaced her facial features with those of another girl, achieving face replacement while keeping the rest of the image unchanged. The composition centers her, emphasizing her calm, introspective expression. The soft, natural light enhances the serene atmosphere, while the muted color palette contrasts with the subtle gold accents, creating a harmonious balance. ",
        child: ['/img/a-12-1.png','/img/a-12-2.png','/img/a-12-3.png'],
      },{
        result: '/img/replacement/a_2.png',
        original: '/img/replacement/a_2.png',
        prompt:"",
        child: ['/img/replacement/a_1.png','/img/replacement/a_5.jpg','/img/replacement/a_6.jpg','/img/replacement/a_4.jpg','/img/replacement/a_3.jpg'],
      },{
        result: '/img/b-12-4.png',
        original: '/img/replacement/a_2.png',
        prompt:"1girl, solo, long_hair, breasts, looking_at_viewer, smile, blue_eyes, blonde_hair, ribbon, ponytail, ass, nude, teeth, barefoot, indoors, looking_back, from_behind, grin, feet, red_ribbon, lips, pillow, toes, anus, soles, all_fours, couch, christmas, freckles, ass_focus, nose, realistic, foot_focus, partially_visible_vulva, on_couch, christmas_tree, naked_ribbon, anus_peek, mole_on_ass.",
        child: [],
      },{
        result: '/img/b-12-1.png',
        original: '/img/replacement/a_2.png',
        prompt:"1girl, solo, breasts, looking_at_viewer, smile, large_breasts, brown_hair, cleavage, brown_eyes, collarbone, upper_body, swimsuit, ponytail, bikini, teeth, grin, fingernails, lips, v, black_bikini, pink_nails, mole_on_breast, realistic, photorealistic.",
        child: [],
      },{
        result: '/img/b-12-2.png',
        original: '/img/replacement/a_2.png',
        prompt:"1girl, solo, breasts, looking_at_viewer, smile.",
        child: [],
      },{
        result: '/img/b-12-3.png',
        original: '/img/replacement/a_2.png',
        prompt:"1girl, solo, long_hair, breasts, looking_at_viewer, smile, blue_eyes, blonde_hair, ribbon, ponytail, ass, nude, teeth, barefoot, indoors, looking_back, from_behind, grin, feet, red_ribbon, lips, pillow, toes, anus, soles, all_fours, couch, christmas, freckles, ass_focus, nose, realistic, foot_focus, partially_visible_vulva, on_couch, christmas_tree, naked_ribbon, anus_peek, mole_on_ass.",
        child: [],
      }
  ];
  export default images;