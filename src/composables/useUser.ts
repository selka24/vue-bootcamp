import { useSupabase } from "./useSupabase";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const session = ref();
export const useUser = () => {
  const supabase = useSupabase();
  const route = useRoute();

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session;
    });

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session;
    });
  });

  function login() {
    console.log(route.fullPath);
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.toString(),
      },
    });
  }

  function logout() {
    supabase.auth.signOut();
  }

  return { session, login, logout };
};
