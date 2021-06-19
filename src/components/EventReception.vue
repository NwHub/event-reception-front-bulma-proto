<template>
  <div>
    <button class="button is-info" @click="regModalShow">導入</button>
    <div v-for="event in eventList" :key="event.id" class="columns is-centered">
      <div class="column is-four-fifths">
        <article class="box media">
          <div class="media-content">
            <p class="title is-4">{{ event.title }}</p>
            <div
              style="white-space: pre-wrap; word-wrap: break-word"
              class="content"
            >
              {{ event.body }}
            </div>

            <div class="columns">
              <div class="column" />
              <div class="column is-one-quarter">
                <div class="buttons">
                  <button class="button is-info" @click="modalShow(event)">
                    予約
                  </button>
                  <button class="button is-danger">Danger</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="modal is-active" v-if="dialog">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ selectEvent.title }}参加予約</p>
          <button
            class="delete"
            aria-label="close"
            @click="modalClose"
          ></button>
        </header>
        <section class="modal-card-body">
          <input type="hidden" v-model="eventReservationFrom.eventId" />
          <div class="field">
            <label class="label">氏名</label>
            <div class="control">
              <input
                v-model="eventReservationFrom.name"
                class="input"
                type="text"
                placeholder="山本 五郎左衛門"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <!-- <input
                class="input is-danger"
                type="email"
                placeholder="Email input"
                value="hello@needswell.com"
              /> -->
              <input
                v-model="eventReservationFrom.email"
                class="input"
                type="email"
                placeholder="you@needswell.com"
                value="you@needswell.com"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="control">
              <a class="button is-static"> @gmail.com </a>
            </p>
            <!-- <p class="help is-danger">This email is invalid</p> -->
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="reservation">予約</button>
          <button class="button" @click="modalClose">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="modal is-active" v-if="regDialog">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">イベント登録</p>
          <button
            class="delete"
            aria-label="close"
            @click="regModalClose"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">タイトル</label>
            <div class="control">
              <input
                v-model="eventRegistrationFrom.title"
                class="input"
                type="text"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">本文</label>
            <textarea
              v-model="eventRegistrationFrom.body"
              class="textarea"
              placeholder="10 lines of textarea"
              rows="10"
            />
          </div>
          <div class="field">
            <label class="label">開催日</label>
            <div class="control">
              <input
                v-model="eventRegistrationFrom.eventDate"
                class="input"
                type="date"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">開始時間</label>
            <div class="control">
              <input
                v-model="eventRegistrationFrom.startTime"
                class="input"
                type="time"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">終了時間</label>
            <div class="control">
              <input
                v-model="eventRegistrationFrom.endTime"
                class="input"
                type="time"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">席数</label>
            <div class="control">
              <input
                v-model="eventRegistrationFrom.seats"
                class="input"
                type="number"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="registration">登録</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from "@/plugins/firebase.js";
export default {
  name: "EventReception",
  data: () => ({
    selectEvent: "",
    eventRegistrationFrom: {
      title: "",
      body: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      seats: 0,
    },
    eventReservationFrom: {
      eventId: "",
      email: "",
      name: "",
    },
    dialog: false,
    regDialog: false,
    eventList: [],
  }),
  async created() {
    const ref = fireDb.collection("dev").doc("event").collection("eventInfo");
    let dataList;
    try {
      const querySnapshot = await ref.get();
      dataList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
    } catch (e) {
      console.error(e);
    }
    this.eventList = dataList;
  },
  methods: {
    async reservation() {
      this.dialog = false;
      const ref = fireDb
        .collection("dev")
        .doc("event")
        .collection("eventReservation");

      const document = {
        eventId: this.eventReservationFrom.eventId,
        name: this.eventReservationFrom.name,
        email: this.eventReservationFrom.email,
      };
      try {
        await ref.add(document);
      } catch (e) {
        console.error(e);
      }
    },
    async registration() {
      this.regDialog = false;
      const ref = fireDb.collection("dev").doc("event").collection("eventInfo");

      const document = this.eventRegistrationFrom;
      try {
        await ref.add(document);
      } catch (e) {
        console.error(e);
      }
    },
    regModalShow() {
      this.regDialog = true;
    },
    regModalClose() {
      this.regDialog = false;
    },
    async writeToFirestore() {
      const ref = fireDb.collection("dev").doc("event").collection("eventInfo");

      const document = {
        title: "第3回モブプロ",
        body:
          "　１８日、人が多く住む住宅街に突然現れたクマ。\nなぜ札幌の市街地にあらわれたのか、そして４人を次々と襲った理由について専門家に聞きました。\n【北海道大学・獣医学研究員・下鶴倫人准教授】\n「少なくとも人なれしたクマの取るような行動ではないという印象」\n札幌の住宅地を移動し続けた５歳から６歳とみられるオスグマ。\nなぜ、突然市街地にあらわれたのか？クマの生態を研究する北海道大学の下鶴准教授は、「２つの理由」をあげます。\n「行動圏を広げて、繁殖機会を探すようなオス独特の行動に関連しているかもしれませんし」「好奇心などもあって少し行動範囲を広げたことも考えられる」札幌市周辺には市街地を取り囲むようにクマの生息域が広がっています。\nしかし、１８日に出没したのは札幌市東区のエリア。\nクマはいったいどこからやってきたのでしょうか。\n【下鶴准教授】\n「当別とかの森林で出生した個体が、何らかのタイミングで川沿いなどを伝いながら街中に入ってきたケースではないかなと」\n今回出没したクマは札幌市の北東にある当別町周辺から、石狩川を超えて札幌市内に入り、石狩川の支流や用水路を伝いながら移動してきた可能性が高いといいます。その距離は直線でも１５キロ以上に及びます。\n住宅街に現れたクマ。\n躊躇することなく、襲い掛かっているようにみえます。\n警戒心が強いとされるクマが、なぜ、人を攻撃したのでしょうか？\n【下鶴准教授】\n「クマは人を獲物として見ていないので、積極的に人を見つけて襲ってくるということはまずありません」\n「逃げたくてもどこに行っていいか分からないというパニック状態の中、目の前にいる人を攻撃してしまった」札幌周辺では近年、クマと人との距離がかつてないほど近づき、住宅街に現れる例も目立ってきています。",
        dateTime: "2010-01-01 10:00",
      };
      try {
        await ref.add(document);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
