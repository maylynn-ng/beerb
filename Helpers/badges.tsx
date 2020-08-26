import { Badge } from '../Models/Badge.model';

export function badgeCheck(
  addAchievement,
  allBadges,
  currentBorough,
  setBadge,
  setIsShowBadgeModal,
  toggleAddBeer,
  user
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
