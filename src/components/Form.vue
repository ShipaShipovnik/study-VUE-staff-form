<template>
  <form @submit.prevent="addUser">
    <label>Имя</label><input type="text" v-model="newUser.name">
    <label>Фамилия</label><input type="text" v-model="newUser.surname">
    <label>Почта</label><input type="email" v-model="newUser.email">
    <label>Телефон</label><input type="text" v-model="newUser.phone">
    <label>Работа</label>
    <select v-model="newUser.job">
      <option v-for="job in jobs" :key="job">{{ job }}</option>
    </select><br>
    <button type="submit">Добавить</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </form>
  <!-- =============================================================== -->
  <br>
  <hr>
  <h3>Список сотрудников:</h3>
  <hr>
  <div class="usercard-container">
    <div v-for="user in users" :key="user.id" class="usercard">
      <template v-if="!user.isEdit">
        <img src="https://gemrussia.ru/upload/uf/fec/mho2ptc16yvwyor9dy1h3zjupxxrgk24.png" alt="ava"
          class="user-avatar">
        <h2>{{ user.name }}</h2>
        <h2>{{ user.surname }}</h2>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        <p>{{ user.job }}</p>
        <button @click="editUser(user)" class="edit-btn">Edit</button>
      </template>
      <template v-if="user.isEdit">
        <input type="text" v-model="user.name" placeholder="Имя"> <br>
        <input type="text" v-model="user.surname" placeholder="Фамилия"><br>
        <input type="email" v-model="user.email" placeholder="Почта"><br>
        <input type="text" v-model="user.phone" placeholder="Телефон"><br>
        <select v-model="user.job">
          <option v-for="job in jobs" :key="job">{{ job }}</option>
        </select><br>
        <button @click="saveUser(user)" class="save-btn">Save</button>
      </template>
      <button @click="deleteUser(user)" class="del-btn"> Удалить </button>
    </div>
  </div>
  <!-- <img src="https://media.tenor.com/U6CsNK6Qy7QAAAAi/tf2-spy.gif" alt=""> -->
</template>





<script>
export default {
  data() {
    return {
      jobs: ['Инженер', 'Солдат', 'Медик', 'Разведчик', 'Шпион', 'Пироман', 'Пулеметчик'],
      newUser: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        job: '',
      },
      error: '',
      users: [
        {
          id: 1,
          name: 'Делл',
          surname: 'Конагер',
          email: '23489@mail.com',
          phone: '345345345',
          job: 'Инженер',
          isEdit: false,
        },
        {
          id: 2,
          name: 'Джейн',
          surname: 'Доу',
          email: '23аууа489@mail.com',
          phone: '45353',
          job: 'Солдат',
          isEdit: false,
        },
        {
          id: 3,
          name: 'Джереми',
          surname: 'Джонс',
          email: '23489@mail.com',
          phone: '345345345',
          job: 'Разведчик',
          isEdit: false,
        },

      ]
    }
  },
  methods: {
    addUser() {
      if (this.newUser.name.trim() === '') {
        this.error = 'Введите имя';
      } else if (this.newUser.surname.trim() === '') {
        this.error = 'Фамилия не введена';
      } else if (this.newUser.email.trim() === '') {
        this.error = 'Почта не введена';
      } else if (this.newUser.phone.trim() === '') {
        this.error = 'Телефон не введен';
      } else if (this.newUser.job.trim() === '') {
        this.error = 'Должность не введена';
      } else {
        const newId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
        this.users.push({
          id: newId,
          name: this.newUser.name,
          surname: this.newUser.surname,
          email: this.newUser.email,
          phone: this.newUser.phone,
          job: this.newUser.job,
          isEdit: false,
        });
        // очистка нью юзер формы
        this.newUser = {
          name: '',
          surname: '',
          email: '',
          phone: '',
          job: '',
          isEdit: false,
        };
        this.error = '';
      }
    },
    editUser(user) {
      user.isEdit = true;
    },
    saveUser(user) {
      user.isEdit = false;
    },
    deleteUser(user) {
      this.users.splice(user, 1)
    },
  }
};
// zob zivb hello bob no wip wop friend wop wip zab zub good baaaddd zib zib wip wop
</script>


<style scoped>
.usercard {
  background-color: rgb(255, 255, 255);
  width: 200px;
  padding: 5px;
  color: black;
}

.usercard-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px
}

button {
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px;
  width: 46%;
  margin: 3px
}

.save-btn {
  background: rgb(172, 172, 172);
}

.edit-btn {
  background: rgb(167, 194, 167);
}

.del-btn {
  background: red;
}

.user-avatar {
  width: 50px
}

form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  width: 500px;
  display: grid;
  grid-template-columns: 20% 80%;
  row-gap: 10px;
}
</style>
