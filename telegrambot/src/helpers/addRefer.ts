import { getUser, updateUser } from '../api/user';
import { updateClient } from '../api/vpn/user';
import { ETariffs } from '../enums/tariffs.enum';
import { getExpirationTime } from '../functions/getExpirationTime';

export const addRefer = async ({ currentUser }: any) => {
  if (currentUser.refer) {
    const referUser = await getUser(currentUser.refer);

    const expiration_time = getExpirationTime({
      startDate: referUser.expiration_time,
      tariff: ETariffs.MONTH1,
    });

    const user = await updateUser({
      user_id: referUser.user_id,
      expiration_time,
    });

    await updateClient(user);
  }
};
