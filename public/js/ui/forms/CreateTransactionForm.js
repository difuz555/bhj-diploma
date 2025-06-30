/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {


    Account.list(null, (err, response) => {
      if (response.success) {
        const listOfAccountItems = [...response.data];

        const incomeAccountList = document.getElementById('income-accounts-list');
        incomeAccountList.innerHTML = '';

        const consumptionAccountList = document.getElementById('expense-accounts-list');
        consumptionAccountList.innerHTML = '';

        listOfAccountItems.forEach((item) => {
          incomeAccountList.innerHTML += `<option value="${item.id}">${item.name}</option>`;
          consumptionAccountList.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        });
      };
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        const incomeModal = App.getModal('newIncome');
        incomeModal.close();

        const consumptionModal = App.getModal('newExpense');
        consumptionModal.close();
        App.update();
      };
    });
  }
}