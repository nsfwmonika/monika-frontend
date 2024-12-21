export interface VideoItem {
    result: string;
    original: string;
    prompt:string;
    child: any[];
  }
  
  export const videoMo: VideoItem[] = [
    {
      result: '/video/a-1.png',
      original: '/video/a-2.mp4',
      prompt:'By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. This picture depicts a muscular, white-haired male warrior with red tribal markings, holding a sword. The dramatic lighting and moody color palette evoke a sense of tension and readiness, characteristic of contemporary fantasy art.',
      child: ['/video/a-3.mp4', '/img/b-1.jpg']
    },
    {
      result: '/video/b-1.png',
      original: '/video/b-2.mp4',
      prompt:'By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. This picture depicts a muscular, white-haired male warrior with red tribal markings, holding a sword. The dramatic lighting and moody color palette evoke a sense of tension and readiness, characteristic of contemporary fantasy art.',
      child: ['/video/a-3.mp4', '/img/b-1.jpg']
    },
    {
      result: '/video/c-1.png',
      original: '/video/c-2.mp4',
      prompt:'By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. This picture depicts a muscular, white-haired male warrior with red tribal markings, holding a sword. The dramatic lighting and moody color palette evoke a sense of tension and readiness, characteristic of contemporary fantasy art.',
      child: ['/video/a-3.mp4', '/img/b-1.jpg']
    },
    {
      result: '/video/d-1.png',
      original: '/video/d-2.mp4',
      prompt:'By utilizing style transfer techniques, we transform the 2D character Gojo Satoru into a realistic human representation, achieving a conversion from anime to photorealistic style. This picture depicts a muscular, white-haired male warrior with red tribal markings, holding a sword. The dramatic lighting and moody color palette evoke a sense of tension and readiness, characteristic of contemporary fantasy art.',
      child: ['/video/a-3.mp4', '/img/b-1.jpg']
    },
    
  ]
  export default videoMo;