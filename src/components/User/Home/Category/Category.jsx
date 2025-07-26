import CategorySection from './CategorySection'

const categoriesData = [
  {
    title: "Instant Outfits",
    description: `Low effort, high impact dresses — just throw them on and go.`,
    image: "/assets/img/instant.jpg",
    link: "Shop Dresses",
  },
  {
    title: "The Oxford Update",
    description:
      " Our new, softer-than-ever staple shirts are perfect for summer days and nights thanks for naturraly breathable cotton",
    image: "/assets/img/oxford.jpg",
    link: "Shop Men",
  },
  {
    title: "All- Star Jackets",
    description:
      " A nod to prep-school varsity style, these bestselling lightweight layers are at the top of their game",
    image: "/assets/img/allstars.jpg",
    link: "Shop Men",
  },
  {
    title: "Cool For School",
    description:
      "Get them pumped for their return to school with preppy staples fit for the first day (and every day after).",
    image: "/assets/img/school.jpg",
    link: "The Back To School Shop",
  },
]
const Category = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">
      {categoriesData.map((item, index) => (
        <div
          key={index}
          className={index < 2 ? "col-span-1" : "lg:col-span-2 col-span-1"}
        >
          <CategorySection
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default Category