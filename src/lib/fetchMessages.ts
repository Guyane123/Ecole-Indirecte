import type { message, messages, senders } from "..";

export function fetchMessages(data: messages) {
    let messages;

    let senders: Array<senders> = [];

    messages = data.messages.received.sort(
        (a: message, b: message) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    messages.forEach((m) => {
        const newSender = {
            name:
                m.from.prenom +
                `${m.from.particule ? " " + m.from.particule : ""}` +
                " " +
                m.from.nom,
        };

        let isDuplicate = false;
        for (let i = 0; i < senders.length; i++) {
            if (senders[i].name == newSender.name) {
                isDuplicate = true;
            }
        }

        if (!isDuplicate) {
            senders.push(newSender as senders);
        }
    });

    messages.forEach((m) => {
        const name =
            m.from.prenom +
            `${m.from.particule ? " " + m.from.particule : ""}` +
            " " +
            m.from.nom;
        const index = senders.findIndex((i) => i.name == name);

        const oldMessages = senders[index].messages
            ? senders[index].messages
            : [];

        const newSender = {
            name: senders[index].name,
            id: m.id,
            messages: [
                ...oldMessages,
                {
                    content: m.subject,
                    createdAt: new Date(m.date),
                    id: m.id,
                    isReaded: m.read,
                },
            ],
        };

        senders[index] = newSender;
    });

    return senders;
}
