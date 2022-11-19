package server.team33.item.mapper;

import org.mapstruct.Mapper;
import server.team33.item.dto.ItemDto;
import server.team33.item.dto.ItemSimpleResponseDto;
import server.team33.item.entity.Item;


@Mapper(componentModel = "spring")
public interface ItemMapper {



    default ItemDto.Response itemToItemResponseDto(Item item) {
        ItemDto.Response itemResponseDto = new ItemDto.Response();

        itemResponseDto.setItemId(item.getItemId());
        itemResponseDto.setThumbnail(item.getThumbnail());
        itemResponseDto.setTitle(item.getTitle());
        itemResponseDto.setPrice(item.getPrice());
        itemResponseDto.setDiscountRate(item.getDiscountRate());
        itemResponseDto.setDiscountPrice(itemResponseDto.getPrice());

        return itemResponseDto;
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
        item.setServingSize(post.getServingSize());
        item.setNutritionFacts(post.getNutritionFacts());
        item.setReviews(post.getReviews());
        item.setTalks(post.getTalks());

        return item;
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
