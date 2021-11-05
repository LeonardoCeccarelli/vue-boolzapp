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

        currentChatConversation: {},

        newMessageToAdd: "",

        filteredContact: "",

        // currentDate: "",

        focusMessage: 0,

    },
    methods: {
        onChangeCurrentConversation(activeChat) {

            setTimeout(this.autoScrollBottom, 0);

            return this.currentChatConversation = activeChat
        },

        onSentNewMessage() {

            if (this.newMessageToAdd.trim() === "") {
                return
            }

            // this.currentDate = this.getDateRealTime()

            this.currentChatConversation.messages.push({
                date: this.getDateRealTime(),
                text: this.newMessageToAdd,
                status: 'sent'
            })

            this.newMessageToAdd = ""

            setTimeout(this.responseFromComputer, 1000)

            setTimeout(this.autoScrollBottom, 0);

        },

        responseFromComputer() {

            const answer = ["Ok!", "Ciao", "Tutto bene", "Come stai?", "Mi dispiace", "Andiamo al cinema?", "Cosa fai nel pomeriggio?"]

            const reply = answer[Math.floor(Math.random() * answer.length)]

            // this.currentDate = this.getDateRealTime()

            this.currentChatConversation.messages.push({
                date: this.getDateRealTime(),
                text: reply,
                status: 'received'
            })

            setTimeout(this.autoScrollBottom, 0);

        },

        getFilteredContacts() {
            if (!this.filteredContact) {
                return this.contacts
            }

            return this.contacts.filter((contact) => {
                return contact.name.toLowerCase().includes(this.filteredContact.toLowerCase().trim());
            })
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

        getLastComputerMsg() {
            const onlyCpuMsg = this.currentChatConversation.messages.filter((message) => {
                return message.status === "received"
            })

            return onlyCpuMsg
        },

        getDateRealTime() {
            const date = dayjs().format('MM/DD/YYYY');
            const time = dayjs().format('HH:mm:ss');

            const dateTime = date + ' ' + time;

            return dateTime
        },

        onSetTabindex() {
            this.focusMessage = 0
        },

        onClickRemoveMessage(index) {

            const deleteMessage = this.currentChatConversation.messages.splice(index, 1)

            this.focusMessage = ""

            return deleteMessage
        },

        autoScrollBottom() {

            let container = this.$el.querySelector("#chat_container")

            container.scrollTop = container.scrollHeight
        }
    },

    beforeMount() {
        this.currentChatConversation = this.contacts[0]
    },

    mounted() {
        setTimeout(this.autoScrollBottom, 0);
    }
})