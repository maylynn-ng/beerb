import { Badge } from '../Models/Badge.model';
import { Borough } from '../Models/Borough.model';
import { User } from '../Models/User.model';

export function badgeCheck(
  addAchievement: (userId: number, badge: Badge) => void,
  allBadges: Badge[],
  currentBorough: Borough,
  setBadge: React.Dispatch<React.SetStateAction<Badge>>,
  setIsShowBadgeModal: React.Dispatch<React.SetStateAction<boolean>>,
  toggleAddBeer: () => void,
  user: User
) {
  if (!user.boroughCounter.hasOwnProperty(currentBorough.boroughName)) {
    const [newBadge] = allBadges.filter((badge: Badge) => badge.badgeName === 'NEW_BOROUGH');

    setBadge(newBadge);
    setIsShowBadgeModal(true);
    addAchievement(user.id, newBadge);
  } else if (
    user.boroughCounter.hasOwnProperty(currentBorough.boroughName) &&
    user.boroughCounter[currentBorough.boroughName] === 4
  ) {
    const [newBadge] = allBadges.filter((badge: Badge) => badge.badgeName === 'FIVE_BEERS');

    setBadge(newBadge);
    setIsShowBadgeModal(true);
    addAchievement(user.id, newBadge);
  } else {
    toggleAddBeer();
  }
}
