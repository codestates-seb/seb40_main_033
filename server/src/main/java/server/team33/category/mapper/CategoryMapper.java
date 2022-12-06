package server.team33.category.mapper;

import org.mapstruct.Mapper;
import server.team33.category.dto.CategoryDto;
import server.team33.category.entity.Category;
import server.team33.item.dto.ItemDto;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    default Category categoryPostDtoToCategory(CategoryDto.Post post) {
        Category category = new Category();
        category.setCategoryName(post.getCategoryName());
        return category;
    }


    default CategoryDto.Response categoryToCategoryResponseDto(Category category) {
        CategoryDto.Response categoryResponseDto = new CategoryDto.Response();
        categoryResponseDto.setCategoryName(category.getCategoryName());
        return categoryResponseDto;
    }

}
