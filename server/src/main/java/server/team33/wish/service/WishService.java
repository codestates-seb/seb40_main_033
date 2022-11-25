package server.team33.wish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.team33.item.entity.Item;
import server.team33.item.repository.ItemRepository;
import server.team33.item.service.ItemService;
import server.team33.user.entity.User;
import server.team33.user.service.UserService;
import server.team33.wish.entity.Wish;
import server.team33.wish.repository.WishRepository;

@Service
@RequiredArgsConstructor
public class WishService {

    private final ItemService itemService;
    private final ItemRepository itemRepository;
    private final WishRepository wishRepository;
    private final UserService userService;


    public void refreshWishes(long itemId) {
        Item item = itemService.findVerifiedItem(itemId);
        item.setTotalWishes(getWishes(itemId));
        itemRepository.save(item);
    }


    public Wish wishItem(long itemId, int isWish) {
        User user = userService.getLoginUser();

        Wish wish = wishRepository.findByItemAndUser(itemService.findItem(itemId), user);

        if (wish == null) {
            Wish newWish = new Wish();
            newWish.addItem(itemService.findVerifiedItem(itemId));
            newWish.addUser(user);
            newWish.setIsWish(isWish);
            wishRepository.save(newWish);
            refreshWishes(itemId);
            return newWish;
        } else {
            wish.setIsWish(isWish);
            wishRepository.save(wish);
            refreshWishes(itemId);
            return wish;
        }

    }

    public int getWishes(long itemId) {
        int wishValue = wishRepository.findWishValue(itemId);
        return wishValue;
    }
}
