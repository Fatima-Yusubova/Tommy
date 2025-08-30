import CategorySection from './CategorySection'
import { categoriesData } from '../../../../constant/constant';

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