<template>
  <div class="form-container">
    <form @submit.prevent="addReg">
      <div class="form-row">
        <div class="form-block">
          <label>
            <input type="radio" v-model="codeHere" :value="true"> Есть код бронирования
          </label>
          <label>
            <input type="radio" v-model="codeHere" :value="false"> Нет кода бронирования
          </label>
        </div>
        <div v-if="codeHere" class="form-block">
          <label for="code">Введите код:</label>
          <input id="code" type="number" v-model.trim="newReg.code">
        </div>
      </div>
      <div class="form-row">
        <div class="form-block">
          <label for="fromAir">Аэропорт вылета</label>
          <select id="fromAir" v-model="newReg.fromAir">
            <option v-for="airport in airports" :key="airport">{{ airport }}</option>
          </select>
        </div>
        <div class="form-block">
          <label for="toAir">Аэропорт прилета</label>
          <select id="toAir" v-model="newReg.toAir">
            <option v-for="airport in airports" :key="airport">{{ airport }}</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-block">
          <label for="flightDate">Дата вылета:</label>
          <VDatePicker id="flightDate" v-model.string="newReg.flightDate" :masks="masks" />
        </div>
        <div class="form-block">
          <label for="birthDate">Дата рождения пассажира:</label>
          <VDatePicker id="birthDate" v-model.string="newReg.birthDate" :masks="masks" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-block">
          <label for="surname">Фамилия пассажира:</label>
          <input id="surname" type="text" v-model.trim="newReg.surname">
        </div>
        <div class="form-block">
          <label for="passport">Серия и номер пасспорта:</label>
          <input id="passport" type="number" v-model="newReg.passport">
        </div>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Добавить</button>
    </form>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Код бронирования:</th>
          <th>Аэропорт вылета:</th>
          <th>Дата вылета:</th>
          <th>Аэропорт прилёта:</th>
          <th>Дата рождения пассажира:</th>
          <th>Фамилия</th>
          <th>Серия и номер паспорта</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in regs" :key="reg.code">
          <td>{{ reg.code }}</td>
          <td>{{ reg.fromAir }}</td>
          <td>{{ reg.flightDate }}</td>
          <td>{{ reg.toAir }}</td>
          <td>{{ reg.birthDate }}</td>
          <td>{{ reg.surname }}</td>
          <td>{{ reg.passport }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      masks: {
        modelValue: 'DD-MM-YYYY',
      },
      codeHere: false,
      error: '',
      airports: [
        "Шереметьево",
        "Домодедово",
        "Внуково",
        "Пулково",
        "Кольцово",
        "Курумоч",
        "Толмачево",
        "Емельяново",
        "Рощино",
        "Уйташ",
        "Казань",
        "Воронеж",
        "Самара",
        "Красноярск",
        "Новосибирск",
        "Хабаровск",
        "Владивосток",
        "Сочи",
        "Геленджик",
        "Минеральные Воды"
      ],
      newReg: {
        code: 0,
        fromAir: "",
        toAir: "",
        flightDate: '',
        birthDate: '',
        surname: '',
        passport: 0,
      },
      regs: [
        {
          code: 1234,
          fromAir: "Пулково",
          toAir: "Казань",
          flightDate: '01-01-2023',
          birthDate: '05-09-2005',
          surname: 'Шипкова',
          passport: 1212123456,
        },
        {
          code: 1572,
          fromAir: "Сочи",
          toAir: "Воронеж",
          flightDate: '01-01-2023',
          birthDate: '05-09-2005',
          surname: 'Степанов',
          passport: 1212412343,
        },
      ],

    }
  },
  methods: {
    addReg() {
      // Валидаторы
      if (this.newReg.fromAir === '' || this.newReg.toAir === '') {
        this.error = 'Выберите аэропорт';
      } else if (this.newReg.fromAir === this.newReg.toAir) {
        this.error = 'Ошибка выбора аэропортов.';
      } else if (this.newReg.surname === '') {
        this.error = 'Введите фамилию';
      } else if (this.newReg.flightDate === '') {
        this.error = 'Выберите дату вылета';
      } else if (this.newReg.birthDate === '') {
        this.error = 'Выберите дату рождения';
      } else if (this.newReg.passport.length < 10 || this.newReg.passport.length > 10) {
        this.error = 'Проверьте правильность ввода серии и номера.';
      } else if (this.newReg.passport === '') {
        this.error = 'Введите серию и номер паспорта';
      } else if (this.codeHere === true && this.newReg.code === '') {
        this.error = 'Введите код';
      } else {
        let newCode;
        if (this.codeHere === false) {
          newCode = this.regs.length > 0 ? Math.max(...this.regs.map(reg => reg.code)) + 1 : 1000;
        } else {
          newCode = this.newReg.code;
        }

        this.regs.push({
          code: newCode,
          fromAir: this.newReg.fromAir,
          toAir: this.newReg.toAir,
          flightDate: this.newReg.flightDate,
          birthDate: this.newReg.birthDate,
          surname: this.newReg.surname,
          passport: this.newReg.passport,
        });

        this.newReg = {
          code: 0,
          fromAir: "",
          toAir: "",
          flightDate: '',
          birthDate: '',
          surname: '',
          passport: 0,
        };
        this.error = '';
      }
    }
  }
};
</script>


<style scoped>
.form-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-block {
  flex: 1;
  margin-right: 10px;
}

.form-block:last-child {
  margin-right: 0;
}

.form-block label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-block input[type="text"],
.form-block input[type="number"],
.form-block select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-bottom: 10px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.table-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow-x: auto;
  /* Добавляем горизонтальный скролл, если таблица не помещается */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: black;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
</style>
