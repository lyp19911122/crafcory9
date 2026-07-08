import { Product } from './types'

export const products: Product[] = [
  {
    id: 'scarf-001',
    name: '云朵围巾 · 渐变粉',
    price: 28.99,
    description: '手工编织渐变粉色羊毛围巾，采用100%美利奴羊毛。每一针都带着温度，柔软的触感像云朵一样包裹着你。渐变粉色从浅粉过渡到玫瑰色，温柔又百搭。',
    images: ['https://picsum.photos/seed/scarf1/600/800', 'https://picsum.photos/seed/scarf1a/600/800'],
    category: '围巾',
    material: '100% 美利奴羊毛',
    dimensions: '180cm × 30cm',
    inStock: true,
    featured: true,
  },
  {
    id: 'scarf-002',
    name: '薄荷呢喃 · 羊绒围巾',
    price: 35.99,
    description: '薄荷绿色的羊绒混纺围巾，轻盈保暖。细密的辫子针法编织出精致的纹理，边缘手工钩出蕾丝花边，每一处细节都是时间的痕迹。',
    images: ['https://picsum.photos/seed/scarf2/600/800', 'https://picsum.photos/seed/scarf2a/600/800'],
    category: '围巾',
    material: '70% 羊绒 30% 丝绸',
    dimensions: '170cm × 28cm',
    inStock: true,
    featured: true,
  },
  {
    id: 'hat-001',
    name: '薰衣草贝雷帽',
    price: 19.99,
    description: '薰衣草紫色的手织贝雷帽，法式慵懒风。柔软的棉混纺线，透气不扎人。帽口罗纹收边，贴合头部不松垮。春日踏青的完美配饰。',
    images: ['https://picsum.photos/seed/hat1/600/800', 'https://picsum.photos/seed/hat1a/600/800'],
    category: '帽子',
    material: '60% 棉 40% 腈纶',
    dimensions: '均码 (54-58cm)',
    inStock: true,
    featured: true,
  },
  {
    id: 'doll-001',
    name: '小兔阿绵 · 钩针玩偶',
    price: 24.99,
    description: '手工钩针编织的兔子玩偶，名叫阿绵。奶白色身体配上粉色耳朵，眼睛是安全塑料珠，可以安心送给小朋友。每一个都是独一无二的，表情略有不同——就像你和我。',
    images: ['https://picsum.photos/seed/doll1/600/800', 'https://picsum.photos/seed/doll1a/600/800'],
    category: '玩偶',
    material: '棉线 填充PP棉',
    dimensions: '约25cm高',
    inStock: true,
    featured: true,
  },
  {
    id: 'doll-002',
    name: '小熊抹茶 · 钩针玩偶',
    price: 27.99,
    description: '抹茶色小熊钩针玩偶，戴着小小的格子围巾。圆润的体型让人忍不住想捏一捏。可坐可立，放在床头或书桌上都是温暖的陪伴。',
    images: ['https://picsum.photos/seed/doll2/600/800', 'https://picsum.photos/seed/doll2a/600/800'],
    category: '玩偶',
    material: '棉线 填充PP棉',
    dimensions: '约30cm高',
    inStock: true,
    featured: false,
  },
  {
    id: 'blanket-001',
    name: '彩虹云毯',
    price: 59.99,
    description: '拼接彩虹色的手编盖毯，每一段颜色都是单独钩织后拼接而成。柔软蓬松，午睡时盖在身上就像被彩虹拥抱。尺寸足够大，两个人窝在沙发上看电影正好。',
    images: ['https://picsum.photos/seed/blanket1/600/800', 'https://picsum.photos/seed/blanket1a/600/800'],
    category: '毯子',
    material: '棉腈混纺',
    dimensions: '150cm × 120cm',
    inStock: true,
    featured: true,
  },
  {
    id: 'blanket-002',
    name: '月光白 · 婴儿毯',
    price: 42.99,
    description: '纯白柔软的婴儿毯，边缘钩织波浪花边。采用有机棉线，不刺激娇嫩肌肤。适合新生儿送礼或自用，附赠同色系小帽子一顶。',
    images: ['https://picsum.photos/seed/blanket2/600/800', 'https://picsum.photos/seed/blanket2a/600/800'],
    category: '毯子',
    material: '100% 有机棉',
    dimensions: '100cm × 80cm',
    inStock: true,
    featured: false,
  },
  {
    id: 'sweater-001',
    name: '奶茶色 · 手工毛衣',
    price: 49.99,
    description: '奶茶色的手织毛衣，V领设计，宽松版型。针法采用了经典的麻花辫+平针组合，厚实保暖。秋日穿一杯奶茶的温度，大概是这种感觉。',
    images: ['https://picsum.photos/seed/sweater1/600/800', 'https://picsum.photos/seed/sweater1a/600/800'],
    category: '毛衣',
    material: '50% 羊毛 50% 腈纶',
    dimensions: 'S/M/L (定制可选)',
    inStock: true,
    featured: true,
  },
  {
    id: 'sweater-002',
    name: '浆果红 · 开襟毛衣',
    price: 54.99,
    description: '浆果红色的手编开襟毛衣，纽扣由天然椰壳制成。七分袖设计，春秋穿刚刚好。前后片分别编织后缝合，版型挺括不会变形。',
    images: ['https://picsum.photos/seed/sweater2/600/800', 'https://picsum.photos/seed/sweater2a/600/800'],
    category: '毛衣',
    material: '100% 美丽诺羊毛',
    dimensions: 'S/M/L (定制可选)',
    inStock: true,
    featured: false,
  },
  {
    id: 'kit-001',
    name: '新手材料包 · 小花发夹',
    price: 15.99,
    description: '包含钩针一根、三色棉线、发夹底座和视频教程二维码。零基础也能在1小时内钩出一朵小花发夹。附赠编织图解一份，从此入坑。',
    images: ['https://picsum.photos/seed/kit1/600/800', 'https://picsum.photos/seed/kit1a/600/800'],
    category: '材料包',
    material: '棉线 + 配件',
    dimensions: '15cm × 10cm 包装盒',
    inStock: true,
    featured: true,
  },
  {
    id: 'kit-002',
    name: '进阶材料包 · 口金包',
    price: 22.99,
    description: '复古风口金零钱包材料包。包含口金框架、刺绣棉线、内衬布和详细图解。成品尺寸小巧精致，自用送人都合适。需要有一定编织基础。',
    images: ['https://picsum.photos/seed/kit2/600/800', 'https://picsum.photos/seed/kit2a/600/800'],
    category: '材料包',
    material: '棉线 + 口金框架 + 内衬',
    dimensions: '约12cm × 8cm (成品)',
    inStock: true,
    featured: false,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
  const cats = products.map((p) => p.category)
  return cats.filter((c, i) => cats.indexOf(c) === i)
}
