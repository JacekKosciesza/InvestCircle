export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  admin: boolean;
  __typename?: string;
}

export const testUser: User = {
  id: '346bbdc9-4de1-496e-be71-46b065474274',
  name: 'Jacek Kościesza',
  email: 'j.kosciesza@codeandpepper.com',
  photo: '/assets/img/users/jacek-kosciesza.jpg',
  admin: true,
};
