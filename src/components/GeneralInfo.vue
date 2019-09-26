<template>
  <div id="_general-info">
    <div class="input-block">
      <label for="_firstName">First Name</label>
      <input id="_firstName" type="text" name="firstName" placeholder="First Name"
             v-model="isCorrect.firstName.firstNameValue"
             @input="checkIsStringEmpty('firstName')"
             :class="{warningClass: this.isCorrect.firstName.wasFocused}"
             required>
            <span class="error-msg" :class="{show: this.isCorrect.firstName.wasFocused }">{{isCorrect
              .firstName.error}}</span>
    </div>

    <div class="input-block">
      <label for="_lastName">Last Name</label>
      <input id="_lastName" type="text" name="lastName" placeholder="Last Name"
             v-model="isCorrect.lastName.lastNameValue"
             @input="checkIsStringEmpty('lastName')"
             :class="{warningClass: this.isCorrect.lastName.wasFocused }" required>
            <span class="error-msg"
                  :class="{show: this.isCorrect.lastName.wasFocused }">{{isCorrect.lastName
        .error}}</span>
    </div>

    <div class="input-block">
      <label for="_selectCountry">Choose your country</label>
      <select id="_selectCountry" name="countryValue"
              v-model="isCorrect.select.countryObj"
              @change="comparePostalCodeWithCountry"
              @click="checkIfCountrySelected"
              :class="{warningClass: !this.isCorrect.select.isValid && this.isCorrect.select.wasClicked}" required>
        <option value="Choose your country" disabled selected>Choose your country</option>
        <option v-for="(el,index) in countries"
                :value="el" :key="index">{{el.Country}}</option>
      </select>
      <span class="error-msg" :class="{show: !this.isCorrect.select.isValid && this.isCorrect.select.wasClicked}">{{
        this.isCorrect.select
        .error}}</span>
    </div>

    <div class="input-block">
      <label for="city">City</label>
      <input id="city" type="text" name="city" placeholder="City"
             v-model="isCorrect.city.name"
             @input="checkIsValidCity"
             :class="{warningClass: isCorrect.city.wasFocused }">
      <span class="error-msg" :class="{show: isCorrect.city.wasFocused }">{{isCorrect.city
        .error}}</span>
    </div>

    <div class="input-block">
      <label for="address">Address</label>
      <input id="address" name="address" type="text"
             v-model="isCorrect.address.value"
             v-mask="'#XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'"
             @input="isFirstCharNumber"
             placeholder="Address"
             :class="{warningClass: !isCorrect.address.isValid && isCorrect.address.wasFocused}">
      <span class="error-msg"
            :class="{show: !isCorrect.address.isValid && isCorrect.address.wasFocused}">{{isCorrect.address
        .error}}</span>
    </div>

    <div class="input-block">
      <label for="_postalCode">Postal code</label>
      <input id="_postalCode" type="text" placeholder="Postal code"
             v-model="isCorrect.postalCode.value"
             @input="comparePostalCodeWithCountry"
             :class="{warningClass: !isCorrect.postalCode.isValid && isCorrect.postalCode.wasFocused}">
      <span class="error-msg"
            :class="{show: !isCorrect.postalCode.isValid && isCorrect.postalCode.wasFocused}">
        {{isCorrect.postalCode.error}}</span>
    </div>

    <div class="checkbox-wrapper">
      <input id="_saveInfo-checkbox"
             type="checkbox" v-model="checked">
      <label for="_saveInfo-checkbox"></label>
    </div>

    <input type="submit" value="checked"
      @click="submitForm">
  </div>
</template>

<script>
/* eslint semi: "error" */

import VueMask from 'v-mask';

export default {
  name: 'GeneralInfo',
  directives: {
    VueMask
  },
  data () {
    return {
      checked: true,
      warningClass: 'warningClass',
      countries: [],
      isValidFields: {
        validFirstName: function () { return this.isCorrect.firstName; },
        validLastName: function () { return this.isCorrect.lastName.isValid; },
        validCity: function () { return this.isCorrect.city.isValid; },
        validAddress: function () { return this.isCorrect.address.isValid; },
        validCountry: function () { return this.isCorrect.select.isValid; },
        validPostalCode: function () { return this.isCorrect.postalCode.isValid; }
      },
      isCorrect: {
        firstName: {
          firstNameValue: null,
          error: 'Fill in your name, please',
          isValid: false,
          wasFocused: false
        },
        lastName: {
          lastNameValue: null,
          error: 'Fill in your surname, please',
          isValid: false,
          wasFocused: false
        },
        city: {
          name: '',
          error: 'Enter valid city name, please',
          isValid: false,
          wasFocused: false
        },
        address: {
          value: '',
          error: 'Fill in your address, please',
          isValid: false,
          wasFocused: false
        },
        select: {
          countryObj: 'Choose your country',
          error: 'Enter valid country, please',
          isValid: false,
          wasClicked: false
        },
        postalCode: {
          value: '',
          error: 'Postal code doesn\'t match for country',
          isValid: true,
          wasFocused: false
        }
      },
      state: true
    };
  },
  mounted: function () {
    this.axios
      .get('https://gist.githubusercontent.com/jamesbar2/1c677c22df8f21e869cca7e439fc3f5b/raw/21662445653ac861f8ab81caa8cfaee3185aed15/postal-codes.json')
      .then(response => (this.countries = response.data));
  },
  methods: {
    checkIsStringEmpty: function (el) {
      if (el === 'firstName') {
        (!this.isCorrect[el].firstNameValue)
          ? this.isCorrect[el].wasFocused = true
          : this.isCorrect[el].wasFocused = false;
      } else if (el === 'lastName') {
        (!this.isCorrect[el].lastNameValue)
          ? this.isCorrect[el].wasFocused = true
          : this.isCorrect[el].wasFocused = false;
      }
    },
    isValidNameLastName () {
      if (!this.isCorrect.firstName.firstNameValue) {
        this.isCorrect.firstName.wasFocused = true;
      }
      if (!this.isCorrect.lastName.firstNameValue) {
        this.isCorrect.lastName.wasFocused = true;
      }
    },
    checkIsValidCity: function () {
      /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(this.isCorrect.city.name)
        ? this.isCorrect.city.wasFocused = false
        : this.isCorrect.city.wasFocused = true;
    },
    isFirstCharNumber: function () {
      let addressVal = this.isCorrect.address.value;
      let firstChar = addressVal.charAt(0).trim();
      if (!Number(firstChar) || !addressVal) {
        this.isCorrect.address.isValid = false;
        this.isCorrect.address.wasFocused = true;
      } else {
        this.isCorrect.isValid = true;
        this.isCorrect.address.wasFocused = false;
      }
    },
    checkIfCountrySelected () {
      if (this.isCorrect.select.countryObj === 'Choose your country') {
        this.isCorrect.select.isValid = false;
        this.isCorrect.select.wasClicked = true;
      } else {
        this.isCorrect.select.isValid = true;
        this.isCorrect.select.wasClicked = false;
      }
    },
    comparePostalCodeWithCountry: function () {
      const regex = new RegExp(this.isCorrect.select.countryObj.Regex);
      const postalCodeVal = this.isCorrect.postalCode.value;

      if (regex.test(postalCodeVal)) {
        this.isCorrect.postalCode.wasFocused = true;
        this.isCorrect.postalCode.isValid = true;
        this.isCorrect.select.isValid = true;
      } else {
        this.isCorrect.postalCode.isValid = false;
        this.isCorrect.select.isValid = false;
      }
    },
    submitForm: function () {
      this.isValidNameLastName();
      this.isFirstCharNumber();
      this.checkIsValidCity();
      this.comparePostalCodeWithCountry();
      this.checkIfCountrySelected();

      let firsN = this.isValidFields.validFirstName;
      let lastN = this.isValidFields.validLastName;
      let city = this.isValidFields.validCity;
      let address = this.isValidFields.validAddress;
      let country = this.isValidFields.validCountry;
      let postalCode = this.isValidFields.validPostalCode;
      //
      // if (!firsN || !lastN || !city || !address || !country || !postalCode) return false;
    }
  },
  computed: {
  }

}
</script>

<style lang="scss" scoped>
  #_general-info {

  }
</style>
