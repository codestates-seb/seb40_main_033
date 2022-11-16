package server.team33.item.mapper;

import org.mapstruct.Mapper;
import server.team33.item.dto.ItemDto;
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

}
