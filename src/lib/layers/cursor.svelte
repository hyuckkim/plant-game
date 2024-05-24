<script lang="ts">
  import { getRes } from "../../assets/image";
  import Sprite from "./sprite.svelte";
  import { mouseX, mouseY } from "../values";


</script>

<Sprite image={getRes("ui")} render={[$mouseX, $mouseY, 18, 25.5]} source={[184, 128, 12, 17]} pos={{x: 0, y: 0}} /> 