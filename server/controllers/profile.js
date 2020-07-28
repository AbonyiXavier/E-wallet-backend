import model from '../models';

export default {
  addProfile: async (req, res) => {
    console.log('user', req.user);
    console.log('userId', req.user.user.id);
    try {
      const profile = await model.Profiles.create({
        image: req.file.location,
        userName: req.body.userName,
        UserId: req.user.user.id,
      });
      console.log('profile', profile);
      return res.send({
        profile,
      });
    } catch (error) {
      console.log('error', error);
    }
  },
};
