package server.team33.item.mapper;

import org.mapstruct.Mapper;
import server.team33.item.dto.ItemDto;
import server.team33.item.dto.ItemSimpleResponseDto;
import server.team33.item.entity.Item;


@Mapper(componentModel = "spring")
public interface ItemMapper {

    default ItemDto.ItemDetailResponse itemToItemDetailResponseDto(Item item) {
        ItemDto.ItemDetailResponse itemDetailResponseDto = new ItemDto.ItemDetailResponse();

        itemDetailResponseDto.setItemId(item.getItemId());
        itemDetailResponseDto.setThumbnail(item.getThumbnail());
        itemDetailResponseDto.setTitle(item.getTitle());
        itemDetailResponseDto.setContent(item.getContent());
        itemDetailResponseDto.setExpiration(item.getExpiration());
//        itemDetailResponseDto.setBrand(item.getBrand());
        itemDetailResponseDto.setSales(item.getSales());
        itemDetailResponseDto.setPrice(item.getPrice());
        itemDetailResponseDto.setCapacity(item.getCapacity());
        itemDetailResponseDto.setServingSize(item.getServingSize());
        itemDetailResponseDto.setDiscountRate(item.getDiscountRate());
        itemDetailResponseDto.setDiscountPrice(item.getPrice());
        itemDetailResponseDto.setNutritionFacts(item.getNutritionFacts());
        itemDetailResponseDto.setItemCategories(item.getItemCategories());
        itemDetailResponseDto.setReviews(item.getReviews());
        itemDetailResponseDto.setTalks(item.getTalks());

        return itemDetailResponseDto;
    }

    default Item itemPostDtoToItem(ItemDto.post post) {
        System.out.println("==================="+post);
        Item item = new Item();

        item.setThumbnail(post.getThumbnail());
        item.setDescriptionImage(post.getDescriptionImage());
        item.setDiscountRate(post.getDiscountRate());
        item.setCapacity(post.getCapacity());
        item.setPrice(post.getPrice());
        item.setSales(post.getSales());
        item.setTitle(post.getTitle());
        item.setContent(post.getContent());
        item.setExpiration(post.getExpiration());
        item.setDiscountPrice(post.getDiscountPrice());
        item.setItemCategories(post.getItemCategories());
        item.setServingSize(post.getServingSize());
        item.setNutritionFacts(post.getNutritionFacts());
        item.setReviews(post.getReviews());
        item.setTalks(post.getTalks());

        return item;
    }

    default ItemDto.ItemCategoryResponse itemToItemCategoryResponseDto(Item item) {
        ItemDto.ItemCategoryResponse itemCategoryResponse = new ItemDto.ItemCategoryResponse();

        itemCategoryResponse.setItemId(item.getItemId());
        itemCategoryResponse.setTitle(item.getTitle());
        itemCategoryResponse.setContent(item.getContent());
        itemCategoryResponse.setPrice(item.getPrice());
//        itemCategoryResponse.setBrand(item.getBrand());
        itemCategoryResponse.setNutritionFacts(item.getNutritionFacts());
        // 리뷰 별 총점
        // 찜의 여부 가 추가 될 예정
        itemCategoryResponse.setReviewSize(item.getReviews().size());

        return itemCategoryResponse;
    }

    default ItemSimpleResponseDto itemToItemSimpleResponseDto(Item item) {
        ItemSimpleResponseDto itemSimpleResponseDto = new ItemSimpleResponseDto();
        itemSimpleResponseDto.setItemId(item.getItemId());
//        itemSimpleResponseDto.setBrand(item.getBrand());
        itemSimpleResponseDto.setThumbnail(item.getThumbnail());
        itemSimpleResponseDto.setTitle(item.getTitle());
        itemSimpleResponseDto.setServingSize(item.getServingSize());
        itemSimpleResponseDto.setPrice(item.getPrice());
        itemSimpleResponseDto.setDiscountRate(item.getDiscountRate());
        itemSimpleResponseDto.setDisCountPrice(item.getDiscountPrice());

        return itemSimpleResponseDto;
    }

}
