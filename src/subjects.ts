import { object, string } from "valibot"
import { createSubjects } from "@openauthjs/openauth/subject"

const subjects = createSubjects({
  user: object({ userName: string() }),
  guild: object({ guildName: string() })
})

export default subjects;