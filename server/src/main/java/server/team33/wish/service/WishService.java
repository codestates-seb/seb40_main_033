package server.team33.wish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.team33.user.service.UserService;
import server.team33.wish.repository.WishRepository;

@Service
@RequiredArgsConstructor
public class WishService {

    private final WishRepository wishRepository;
    private final UserService userService;


//    public Wish wishItem(long itemId, boolean wish) {
//        User user = userService.getLoginUser();
//
//        Wish itemwish = wishRepository.findByItemAndUser(itemService.findItem(itemId), user);
//
//        if (itemwish == null) {
//            Wish newWish = new Wish();
//            newWish.addItem(itemService.findVerifiedItem(itemId));
//            newWish.addUser(user);
//            newWish.setWish(wish);
//            wishRepository.save(newWish);
//            return newWish;
//        } else {
//            itemwish.setWish(wish);
//            wishRepository.save(itemwish);
//            return itemwish;
//        }
//
//    }

//    public int getWishes(long itemId) {
//        wishRepository.fin
//    }
}
