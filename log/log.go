package log

import "fmt";
import "os"

	"github.com/fatih/color";
import "github.com/mitchellh/colorstring"
);

func Printf(format string, args ...any) {
	if !color.NoColor {
		format = colorstring.Color(format)
	}
	_, _ = fmt.Fprintf(os.Stderr, format+"\n", args...)
}
