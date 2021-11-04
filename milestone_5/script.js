"use strict"

Vue.config.devtools = true;

new Vue({
    el: "#root",
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

        currentIndexConversation: 0,

        newMessageToAdd: "",

        filteredContact: "",

        currentDate: "",

        focusMessage: 0,

    },
    methods: {
        onChangeCurrentConversation(index) {
            return this.currentIndexConversation = index
        },

        onSentNewMessage() {

            if (this.newMessageToAdd.trim() === "") {
                return
            }

            this.currentDate = this.getDateRealTime()

            this.contacts[this.currentIndexConversation].messages.push({
                date: this.currentDate,
                text: this.newMessageToAdd,
                status: 'sent'
            })

            this.newMessageToAdd = ""

            setTimeout(this.responseFromComputer, 1000)
        },

        responseFromComputer() {

            const answer = ["Ok!", "Ciao", "Tutto bene", "Come stai?", "Mi dispiace"]

            const reply = answer[Math.floor(Math.random() * answer.length)]

            this.currentDate = this.getDateRealTime()

            this.contacts[this.currentIndexConversation].messages.push({
                date: this.currentDate,
                text: reply,
                status: 'recived'
            })
        },

        getFilteredContacts() {
            let newArray = this.contacts.filter((el) => {
                let filterValue = true

                if (el.name.toLowerCase().includes(this.filteredContact.toLowerCase())) {
                    filterValue = true
                } else {
                    filterValue = false
                }

                return filterValue
            })

            return newArray
        },

        getLastMessage(messages) {

            if (messages.length === 0) {
                return ""
            }

            const lastMessage = messages[messages.length - 1].text

            if (lastMessage.length > 30) {
                return lastMessage.slice(0, 30) + " ..."
            } else {
                return lastMessage
            }
        },

        getLastTimeLogin(messages) {

            if (messages.length === 0) {
                return ""
            }

            return messages[messages.length - 1].date
        },

        getDateRealTime() {
            const today = new Date();
            const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const dateTime = date + ' ' + time;

            return dateTime
        },

        onSetTabindex() {
            this.focusMessage = 0
        },

        onClickRemoveMessage(index, currentConversation) {

            const deleteMessage = this.contacts[currentConversation].messages.splice(index, 1)

            this.focusMessage = ""

            return deleteMessage
        }
    }
})